import React from "react";

// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import auth from "app_component/authentication/auth";

export default function NavBar() {
  const history = useHistory();
  const [userInfo, setUserInfo] = React.useState({});

  React.useEffect(() => {
    auth.getUser().then((user) => {
      setUserInfo(user);
    });
  }, []);
  return (
    <Navbar className="navbar-transparent mr-1 pr-5 " expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            href="#home"
            onClick={() => {
              history.push("/home");
            }}
          >
            <img
              alt="..."
              className="img rounded"
              src={
                require("assets/img/logo_intalents/Intalents Logo-01.png")
                  .default
              }
              height="150px"
              width="200px"
            />
          </NavbarBrand>
          <button className="navbar-toggler" id="example-navbar-transparent">
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <UncontrolledCollapse navbar toggler="#example-navbar-transparent">
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#talents" onClick={(e) => e.preventDefault()}>
                  In• <span>Talents</span>
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  className="navbar-toggler"
                  id="example-navbar-transparent"
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav className="ml-auto" navbar>
            {userInfo.role == "admin" ? (
              <NavItem>
                <NavLink
                  href="#chat"
                  onClick={() => {
                    history.push("/messages");
                  }}
                >
                  see all chats
                </NavLink>
              </NavItem>
            ) : null}
            {userInfo.role == "client" || userInfo.role == "admin" ? (
              <NavItem>
                <NavLink
                  href="#post_add"
                  onClick={() => {
                    history.push("/post_add");
                  }}
                >
                  Post a job
                </NavLink>
              </NavItem>
            ) : null}
            {userInfo.role == "client" || userInfo.role == "admin" ? (
              <NavItem>
                <NavLink
                  href="#talents"
                  onClick={() => {
                    history.push("/talents");
                  }}
                >
                  Talents
                </NavLink>
              </NavItem>
            ) : null}

            <NavItem>
              <NavLink
                href="#home"
                onClick={() => {
                  history.push("/home");
                }}
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#messages"
                onClick={() => {
                  history.push("/messages");
                }}
              >
                Messages
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#profile"
                onClick={() => {
                  history.push("/profile");
                }}
              >
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#settings"
                onClick={() => {
                  history.push("/user-settings");
                }}
              >
                Settings
              </NavLink>
            </NavItem>
          </Nav>
        </UncontrolledCollapse>
      </Container>
    </Navbar>
  );
}
