import React from "react";

// reactstrap components
import { Button, Container, Col, Row } from "reactstrap";
import { useHistory } from "react-router";

export default function SignupRedirection() {
  const scrollPage = (e) => {
    e.preventDefault();
    document.getElementById("pricing").scrollIntoView();
  };
  const history = useHistory();
  const style = { "background-color": "#451a5e" };

  return (
    <>
      <div className="page-header ">
        <Container>
          <div className="content-center brand ">
            <img
              alt="..."
              className="img rounded "
              src={require("assets/img/logo_intalents/Logomark-03.png").default}
              height="240px"
              width="290px"
            />
            <h1 className="h1-seo ">
              <strong> Welcome to InTALENTS</strong>
            </h1>
            <h2>Find your dream job in many coutries all over the world.</h2>
            <p>
              If you want to hire skilled profile , you are in the right place{" "}
            </p>
            <Row>
              <Col>
                {" "}
                <Button
                  className="btn-simple btn-sign-up"
                  color="warning"
                  size="lg"
                  target="_blank"
                  onClick={() => {
                    history.push("/register");
                  }}
                >
                  Signup as a talent
                </Button>
              </Col>
              <Col>
                <Button
                  className="btn-simple btn-sign-up"
                  color="warning"
                  size="lg"
                  target="_blank"
                  onClick={() => {
                    history.push("/signup_client");
                  }}
                >
                  Signup as a client
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}
