import React from "react";
import classnames from "classnames";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import DemoFooter from "components/Footers/DemoFooter.js";
import { REGISTER, UPLOAD_USER_PICTURE } from "../../constants/api";
import Navbar from "app_component/NavBar/navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import validation from "./validation";
import { useHistory } from "react-router-dom";

toast.configure();

export default function Register() {
  const [fullNameFocus, setFullNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const history = useHistory();
  //sign up form attribute
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  //handling form attribute changes
  const hangleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const [errorUsername, setErrorUsername] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState("");

  const [errors, setErrors] = React.useState("");
  const wrapper = React.useRef(null);
  React.useEffect(() => {
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  }, []);

  const validationErrorHandler = (error) => {
    if (error === 400) {
      setErrorEmail("Email already exist");
      toast.error("email already exist");
    } else {
      setErrorEmail("");
    }
    if (error === 401) {
      setErrorUsername("Username already exist");
    } else {
      setErrorUsername("");
    }
  };

  const registerUserHandler = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    const data = {
      email: values.email,
      password: values.password,
      username: values.username,
      role: "talent",
    };
    axios
      .post(REGISTER, JSON.stringify(data))
      // fetch(REGISTER, {
      //   method: "Post",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // })
      .then((response) => {
        history.push("/login");
        toast.success("registered successfully");
      })
      .catch((error) => validationErrorHandler(error.response.status));
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="register-box">
        <div className="page-header-image" />
        <div className="background-login-image">
          <Container>
            <Row>
              <Col className="mx-auto" lg="5" md="12">
                <Card className="card-login">
                  <Form action="" className="form" method="">
                    <CardHeader
                      className="card-header-login"
                      style={{ padding: "0" }}
                    >
                      <div className="title-logo-login">
                        <CardTitle tag="h2">Register</CardTitle>

                        <img
                          alt="..."
                          className="img rounded"
                          src={
                            require("assets/img/logo_intalents/Logomark-01.png")
                              .default
                          }
                          style={{
                            height: "105px",
                            width: "130px",
                            margin: "0%",
                            position: "relative",
                            top: "-8px",
                            left: "-29px",
                          }}
                        />
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Form className="form">
                        <InputGroup
                          className={classnames({
                            "input-group-focus": fullNameFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="username"
                            type="text"
                            onFocus={(e) => setFullNameFocus(true)}
                            onBlur={(e) => setFullNameFocus(false)}
                            onChange={hangleChange}
                            value={values.username}
                            name="username"
                            className="place-holder-input"
                          />
                        </InputGroup>
                        {errors.username && (
                          <p className="text-danger">{errors.username}</p>
                        )}
                        <p className="text-danger">{errorUsername}</p>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": emailFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="text"
                            onFocus={(e) => setEmailFocus(true)}
                            onBlur={(e) => setEmailFocus(false)}
                            onChange={hangleChange}
                            value={values.email}
                            name="email"
                            className="place-holder-input"
                          />
                        </InputGroup>
                        {errors.email && (
                          <p className="text-danger">{errors.email}</p>
                        )}

                        <p className="text-danger">{errorEmail}</p>

                        <InputGroup
                          className={classnames({
                            "input-group-focus": passwordFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-lock-circle" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            onFocus={(e) => setPasswordFocus(true)}
                            onBlur={(e) => setPasswordFocus(false)}
                            onChange={hangleChange}
                            value={values.password}
                            name="password"
                            className="place-holder-input"
                          />
                        </InputGroup>
                        {errors.password && (
                          <p className="text-danger">{errors.password}</p>
                        )}

                        <FormGroup className="text-left ">
                          <Label check style={{ color: "purple" }}>
                            <span
                              className="form-check-sign signin-button"
                              style={{ color: "purple" }}
                            />
                            Already a member ?{" "}
                            <a href="#h" onClick={() => history.push("/login")}>
                              Sign in
                            </a>
                            .
                          </Label>
                        </FormGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        block
                        className="btn-round"
                        color="info"
                        href="#"
                        onClick={registerUserHandler}
                        size="lg"
                      >
                        Get Started
                      </Button>
                    </CardFooter>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
