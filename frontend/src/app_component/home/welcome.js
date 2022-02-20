import React from "react";

// reactstrap components
import {
  Button,
  Container,
  Col,
  Row,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  UncontrolledCollapse,
  NavbarBrand,
} from "reactstrap";
import { useHistory } from "react-router";

export default function Welcome() {
  const history = useHistory();
  return (
    <>
      <div className="header header-4">
        <div className="header-wrapper">
          <Navbar className="navbar-transparent" expand="lg">
            <Container>
              <div className="navbar-translate">
                <button className="navbar-toggler" id="example-header-4">
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
                <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    alt="..."
                    className="img rounded"
                    src={require("assets/img/Intalents Logo-03.png").default}
                    height="120px"
                    width="150px"
                  />{" "}
                </NavbarBrand>
              </div>
              <UncontrolledCollapse navbar toggler="#example-header-4">
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        In• <span>Talents</span>
                      </a>
                    </Col>
                    <Col className="collapse-close text-right" xs="6">
                      <button className="navbar-toggler" id="example-header-4">
                        <i className="tim-icons icon-simple-remove" />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="mx-auto" navbar>
                  <NavItem className="active">
                    <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
                      Home
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
                      About Us
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
                      Contact Us
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav className="nav navbar-right" navbar>
                  <NavItem>
                    <NavLink href="#" target="_blank">
                      <i className="fab fa-twitter" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#" target="_blank">
                      <i className="fab fa-facebook-square" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#" target="_blank">
                      <i className="fab fa-instagram" />
                    </NavLink>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
          <div className="page-header header-video header-filter">
            <div className="overlay" />
            <video autoPlay="autoplay" loop="loop" playsInline="playsinline">
              <source
                src={require("assets/video/intalents.mp4").default}
                type="video/mp4"
              />
            </video>
            <Container className="text-center">
              <div className="video-text">
                <h1 className="title">In Talents</h1>
                <br />
                <Button
                  className="btn-simple btn-neutral"
                  color="default"
                  onClick={() => history.push("/signup_red")}
                >
                  Become a member
                </Button>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
