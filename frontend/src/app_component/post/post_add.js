import React from "react";

import {
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  Container,
  Col,
  Row,
  CardTitle,
} from "reactstrap";
import Navbar from "app_component/NavBar/navbar";
import DemoFooter from "components/Footers/DemoFooter.js";
import Select from "react-select";
import { POST_ADD, REGISTER } from "constants/api";
import axios from "axios";
import auth from "app_component/authentication/auth";
import validation from "./post_validation";
import ImageUpload from "components/CustomUpload/ImageUpload.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
toast.configure();
export default function PostAdd() {
  const history = useHistory();
  const required = {
    content: "*",
    color: "red",
  };
  const [values, setValues] = React.useState({
    title: "",
    description: "",
    language: "",
    field: "",
    adress: "",
    post_teaser_picture: "",
  });
  const [language, setLanguage] = React.useState("English");
  const [field, setField] = React.useState("Other");
  const [errors, setErrors] = React.useState("");
  const [userinfo, setUserInfo] = React.useState({});
  const fileInput = React.useRef(null);
  const [file, setFile] = React.useState(null);

  const hangleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  React.useEffect(() => {
    //get user info when loading the component
    auth.getUser().then((user) => {
      setUserInfo(user);
    });
  }, []);

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
    };
    reader.readAsDataURL(file);
  };

  const addPostHandler = (event) => {
    event.preventDefault();
    setErrors(validation(values));

    const params = {
      title: values.title,
      description: values.description,
      field: field.label,
      language: language.label,
      address: values.adress,
      post_teaser_picture: values.post_teaser_picture,
      file: file,
    };
    let formData = new FormData();
    formData.append("image", file);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("address", values.adress);
    formData.append("language", language.label);
    formData.append("field", field.label);
    axios
      .post("/users/" + userinfo.id + "/posts", formData, {})
      .then((response) => {
        history.push("/home");
        toast.success("Event added successfully");
      })
      .catch(() => {
        toast.success("An error has occured");
      });
  };

  return (
    <>
      <Navbar />

      <Container className="align-items-center mt-0 pt-0">
        <Card className="mb-4">
          <CardBody>
            <FormGroup>
              <h1>Post event</h1>
              <Label for="exampleEmail" className="mt-3">
                Event Title <label style={required}>*</label>
              </Label>
              <Input
                type="text"
                name="title"
                id="Title"
                placeholder="Enter  the job title"
                value={values.title}
                onChange={hangleChange}
              />{" "}
              {errors.title && <p className="text-danger">{errors.title}</p>}
              <Row>
                <Col sm={6}>
                  {" "}
                  <Label for="exampleEmail" color="danger" className="mt-3">
                    Language <label style={required}>*</label>
                  </Label>
                  <Select
                    className="react-select react-select-info"
                    classNamePrefix="react-select"
                    placeholder="Language"
                    onChange={setLanguage}
                    value={language}
                    options={[
                      { value: "", label: "Arabic" },
                      { value: "", label: "Spanish" },
                      { value: "", label: "English" },
                      { value: "", label: "French" },
                      { value: "", label: "Other" },
                    ]}
                  />
                </Col>
                <Col sm={6}>
                  <Label for="exampleEmail" color="danger" className="mt-3">
                    Field <label style={required}>*</label>
                  </Label>
                  <Select
                    className="react-select react-select-info"
                    classNamePrefix="react-select"
                    placeholder="Field"
                    value={field}
                    onChange={setField}
                    options={[
                      { value: "", label: "drawing" },
                      { value: "", label: "photographer" },
                      { value: "", label: "Model" },
                      { value: "", label: "Other" },
                    ]}
                  />
                </Col>{" "}
              </Row>
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail" className="mt-3">
                Adress<label style={required}>*</label>
              </Label>
              <Input
                type="text"
                name="adress"
                id="adress"
                placeholder="Enter  the job adress"
                value={values.adress}
                onChange={hangleChange}
              />{" "}
            </FormGroup>

            <FormGroup>
              <Label for="examplePassword" className="mt-3">
                Description<label style={required}>*</label>
              </Label>
              <Input
                type="textarea"
                name="description"
                id="examplePassword"
                placeholder="description "
                class="form-control"
                value={values.description}
                onChange={hangleChange}
              />
              {errors.description && (
                <p className="text-danger">{errors.description}</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword" className="mt-3">
                Upload your company logo <label style={required}>*</label>
              </Label>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={handleImageChange}
                  ref={fileInput}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label>
              </div>
            </FormGroup>

            <Button
              color="success"
              type="submit"
              className="mt-3"
              onClick={addPostHandler}
            >
              Done
            </Button>
          </CardBody>
        </Card>
      </Container>

      <DemoFooter />
    </>
  );
}
