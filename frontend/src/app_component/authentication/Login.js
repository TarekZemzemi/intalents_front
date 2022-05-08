import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row
} from "reactstrap";

// core components
import DemoFooter from "components/Footers/DemoFooter.js";
import { LOGIN } from "../../constants/api";
import axios from "axios";
import qs from "qs";
import Navbar from "app_component/NavBar/navbar";
import { useHistory } from "react-router-dom";
import decodeJwt from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export default function LoginPage() {
  const [firstNameFocus, setFirstNameFocus] = React.useState(undefined);
  const [lastNameFocus, setLastNameFocus] = React.useState(undefined);
  const history = useHistory();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    document.body.classList.add("login-page");
    return function cleanup() {
      document.body.classList.remove("login-page");
    };
  }, []);

  const [values, setValues] = React.useState({
    username: "",
    password: "",
  });
  const [error, setError] = React.useState(null);

  const handleChanges = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = (event) => {
    // preventDefault is called on the event when submitting the form to prevent a browser reload/refresh
    event.preventDefault();
    // setError(null);

    const params = qs.stringify({
      username: values.username,
      password: values.password,
    });
    const headers = {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios
      .post(LOGIN, params, {
        headers: headers
      })
      .then((result) => {
        if (result.status === 200 && "access_token" in result.data) {
          decodeJwt(result.data["access_token"]);
          localStorage.setItem("token", result.data["access_token"]);
          history.push("/home");
          toast.success("logged in");
        } else {
          setError("username or password is incorrect");
          toast.error("incorrect username or password");
        }
      })
      .catch((e) => {
        setError("username or password is incorrect");
        toast.error("incorrect username or password");
      });
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="page-header-login">
        <div className="page-header-image" />
        <div className="background-login-image">
          <Container>
            <Row>
            <Col className="mx-auto" lg="5" md="8">
              <Card className="card-login">
                <Form action="" className="form" method="">
                  <CardHeader
                    className="card-header-login"
                    style={{ padding: "0" }}
                  >
                    <div className="title-logo-login">
                      <CardTitle tag="h2">Login</CardTitle>

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
                    <InputGroup
                      className={classnames("input-lg", {
                        "input-group-focus": firstNameFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="username..."
                        type="text"
                        onFocus={(e) => setFirstNameFocus(true)}
                        onBlur={(e) => setFirstNameFocus(false)}
                        name="username"
                        value={values.username}
                        onChange={handleChanges}
                        className="place-holder-input"
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames("input-lg", {
                        "input-group-focus": lastNameFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-caps-small" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="password..."
                        type="password"
                        onFocus={(e) => setLastNameFocus(true)}
                        onBlur={(e) => setLastNameFocus(false)}
                        value={values.password}
                        name="password"
                        onChange={handleChanges}
                        className="place-holder-input"
                      />
                    </InputGroup>
                    <center>
                      {error && <p className="text-danger">{error}</p>}
                    </center>
                  </CardBody>

                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="primary"
                      href="#pablo"
                      onClick={handleLogin}
                      size="lg"
                    >
                      Sign in
                    </Button>
                  </CardFooter>

                  <div className="pull-left ml-3 mb-3">
                    <h6>
                      <a
                        className="link footer-link"
                        href="#pablo"
                        onClick={() => history.push("/register")}
                      >
                        Create Account
                      </a>
                    </h6>
                  </div>
                  <div className="pull-right mr-3 mb-3">
                    <h6>
                      <a
                        className="link footer-link"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Need Help?
                      </a>
                    </h6>
                  </div>
                </Form>
              </Card>
            </Col>
            </Row>
            
          </Container>
        </div>
      </div>
      {/* <DemoFooter /> */}
    </>
  );
}
