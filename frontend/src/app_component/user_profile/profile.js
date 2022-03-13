import React, { Component } from "react";
import classnames from "classnames";
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Image,
} from "reactstrap";

import DemoFooter from "components/Footers/DemoFooter.js";
import Navbar from "app_component/NavBar/navbar";
import auth from "app_component/authentication/auth";
import ImageUpload from "components/CustomUpload/ImageUpload.js";
import { toast } from "react-toastify";
import { GET_USER_PICUTRES } from "constants/api";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function Profile() {
  const [tabs, setTabs] = React.useState(1);
  const wrapper = React.useRef(null);
  const [userinfo, setUserInfo] = React.useState({});
  const [userPictures, setUserPictures] = React.useState([]);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    wrapper.current.scrollTop = 0;
    document.body.classList.add("profile-page");
    auth.getUser().then((user) => {
      setUserInfo(user);
      get_user_picutres(user.id);
    });

    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  }, []);

  const get_user_picutres = (id) => {
    axios.get(GET_USER_PICUTRES + id).then((res) => {
      setUserPictures(res.data);
    });
  };
  const style = {
    "max-width": "none",
    "margin-top": "0px",
  };
  return (
    <>
      <Navbar />
      <div className="wrapper" ref={wrapper}>
        <div className="page-header-profile">
          <Container className="align-items-center pt-5 mt-3">
            <Row>
              {/* <Col lg="6" md="8">
                <Row>
                  <h1
                    className="profile-title text-left"
                    style={{ position: "relative", left: "6px" }}
                  >
                    {userinfo.firstName} {userinfo.lastName}
                  </h1>
                </Row>
                <Row>
                  {" "}
                  <p className="profile-description">{userinfo.description}</p>
                </Row>
                <Row>
                  {" "}
                  <ImageUpload style={{ position: "absolute", top: "100px" }} />
                </Row>
              </Col> */}

              <Col className="ml-auto mr-auto" lg="5" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    {userinfo.pictureName == undefined ? (
                      <img
                        src={"no_image.jpg"}
                        className="img-center img-fluid rounded-circle"
                        alt="sample Image"
                      />
                    ) : (
                      <img
                        src={"uploaded_pictures/" + userinfo.pictureName}
                        className="img-center img-fluid rounded-circle"
                        alt="sample Image"
                      />
                    )}

                    <h4 className="title">
                      {userinfo.firstName} {userinfo.lastName}
                    </h4>
                    <ImageUpload />
                  </CardHeader>{" "}
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#pablo"
                        >
                          Job
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                          }}
                          href="#pablo"
                        >
                          Personal
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(3);
                          }}
                          href="#pablo"
                        >
                          Adress
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Job informations</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td> Job : {userinfo.job}</td>
                            </tr>
                            <tr>
                              <td>Experience : {userinfo.experience} years</td>
                            </tr>
                            <tr>
                              <td>Hourly rate: {userinfo.hourly_rate} $</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Personal informations</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td> First Name : {userinfo.firstName}</td>
                            </tr>
                            <tr>
                              <td>Last Name : {userinfo.lastName}</td>
                            </tr>
                            <tr>
                              <td>gender : {userinfo.gender}</td>
                            </tr>
                            <tr>
                              <td> Language : {userinfo.language}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab3">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Adress informations</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td> Adress : {userinfo.adress}</td>
                            </tr>
                            <tr>
                              <td>Country : {userinfo.country}</td>
                            </tr>
                            <tr>
                              <td>City : {userinfo.city}</td>
                            </tr>
                            <tr>
                              <td> Zip code : {userinfo.zipCode}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Row>
            {userPictures.map((picture) => {
              return (
                <Col lg="4" md="6">
                  <Card className="card-blog card-plain">
                    <div className="card-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="img rounded"
                          src={`uploaded_pictures/${picture.picture_name}`}
                          style={style}
                        />
                      </a>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
        <DemoFooter />
      </div>
    </>
  );
}
