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

import validation from "./validation";
// core components
import DemoFooter from "components/Footers/DemoFooter.js";
import { REGISTER } from "../../constants/api";
import Navbar from "app_component/NavBar/navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export default function Register() {
  const [fullNameFocus, setFullNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
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
    if (error == "400") {
      setErrorEmail("Email already exist");
      toast.error("email already exist");
    } else {
      setErrorEmail("");
    }
    if (error == "401") {
      setErrorUsername("Username already exist");
    } else {
      setErrorUsername("");
    }
  };

  const registerUserHAndler = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    const data = {
      email: values.email,
      password: values.password,
      username: values.username,
      role: "talent",
    };
    fetch(REGISTER, {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => validationErrorHandler(response.status))

      .catch((error) => validationErrorHandler(error.status));
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="register-box">
        <div className="background-img">
          <div className="page-header-image" />
          <Container>
            <Row>
              <Col className="mx-auto" lg="5" md="12">
                <Card className="card-register">
                  <CardHeader>
                    {/* <CardImg
                      alt="..."
                      src={require("assets/img/square1.png").default}
                    /> */}
                    <CardTitle tag="h4">Register</CardTitle>
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
                        />
                      </InputGroup>
                      {errors.password && (
                        <p className="text-danger">{errors.password}</p>
                      )}

                      <FormGroup check className="text-left">
                        <Label check>
                          <Input type="checkbox" />
                          <span className="form-check-sign" />I agree to the{" "}
                          <a href="#h" onClick={(e) => e.preventDefault()}>
                            terms and conditions
                          </a>
                          .
                        </Label>
                      </FormGroup>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button
                      className="btn-round"
                      color="info"
                      href="#"
                      onClick={registerUserHAndler}
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
