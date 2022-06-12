import React from "react";
import classnames from "classnames";
import {
  Button,
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
  UncontrolledTooltip,
  FormGroup,
  Input,
} from "reactstrap";

import DemoFooter from "components/Footers/DemoFooter.js";
import Navbar from "app_component/NavBar/navbar";
import {BCKND_API_IP, GET_USER_BY_ID} from "constants/api";
import axios from "axios";
import { CREATE_CONVERSATION, SEND_MESSAGE } from "../../constants/api";
import auth from "app_component/authentication/auth";

const items = [
  {
    altText: "",
    caption: "Big City Life, United States",
    src: require("assets/img/denys.jpg").default,
  },
  {
    altText: "",
    caption: "Somewhere Beyond, United States",
    src: require("assets/img/fabien-bazanegue.jpg").default,
  },
  {
    altText: "",
    caption: "Stocks, United States",
    src: require("assets/img/mark-finn.jpg").default,
  },
];

export default function CheckProfile(props) {
  const [tabs, setTabs] = React.useState(1);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const wrapper = React.useRef(null);
  const [userinfo, setUserInfo] = React.useState({});
  const [currentUserInformations, setCurrentUserInformations] = React.useState(
    {}
  );

  const [show, setShow] = React.useState(false);
  const [conversationName, setConversationName] = React.useState("");
  const [content, setContent] = React.useState("");
  const [conversationParticiPant, setConversationParticiPant] = React.useState(
    []
  );

  const [values, setValues] = React.useState({
    conversationName: "",
    content: "",
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    wrapper.current.scrollTop = 0;
    document.body.classList.add("profile-page");
    checkUserProfileInformations();
    getCurrentUserInformations();

    console.log("li bch nab3athlou ", props.match.params.id);
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  }, []);

  const checkUserProfileInformations = () => {
    const user_id = props.match.params.id;
    axios.get(GET_USER_BY_ID.replace("{user_id}", user_id)).then((response) => {
      let user = response.data;
      setUserInfo(user);
      console.log(user);
    });
  };

  const getCurrentUserInformations = () => {
    auth.getUser().then((user) => {
      setCurrentUserInformations(user);
      console.log("li connecté", user.id);
    });
  };

  const createNewConversation = (event) => {
    event.preventDefault();
    let receiver = props.match.params.id;
    let sender = currentUserInformations.id;
    let participant = [];
    participant.push(receiver);
    participant.push(JSON.stringify(sender));
    const params = {
      conversation_name: values.conversationName,
      participants: [...participant],
    };
    axios
      .post(CREATE_CONVERSATION, params)
      .then((response) => {
        console.log(response.data);
      })
      .then(() => sendMessage(sender, receiver))
      .catch((error) => {
        console.log(error);
      });
  };

  const sendMessage = (senderId, conversationId) => {
    const params = {
      content: values.content,
    };
    axios
      .post(SEND_MESSAGE + senderId + "/" + conversationId, params)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onExiting = () => {
    setAnimating(true);
  };

  const onExited = () => {
    setAnimating(false);
  };

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  const showMessageBox = () => {
    setShow(!show);
  };
  return (
    <>
      <Navbar />
      <div className="wrapper" ref={wrapper}>
        <div className="page-header">
          <Container className="align-items-center pt-5 mt-3">
            <Row>
              <Col lg="6" md="6">
                <h1 className="profile-title text-left">
                  {userinfo.firstName} {userinfo.lastName}
                </h1>
                <h5 className="text-on-back">01</h5>
                <p className="profile-description">{userinfo.description}</p>
                <div className="btn-wrapper profile pt-3">
                  <Button
                    className="btn-icon btn-round"
                    color="twitter"
                    href="https://twitter.com/creativetim"
                    id="tooltip337991226"
                    target="_blank"
                  >
                    <i className="fab fa-twitter" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip337991226">
                    Follow us
                  </UncontrolledTooltip>
                  <Button
                    className="btn-icon btn-round"
                    color="facebook"
                    href="https://www.facebook.com/creativetim"
                    id="tooltip304767046"
                    target="_blank"
                  >
                    <i className="fab fa-facebook-square" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip304767046">
                    Like us
                  </UncontrolledTooltip>
                  <Button
                    className="btn-icon btn-round"
                    color="dribbble"
                    href="https://dribbble.com/creativetim"
                    id="tooltip615365713"
                    target="_blank"
                  >
                    <i className="fab fa-dribbble" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip615365713">
                    Follow us
                  </UncontrolledTooltip>
                </div>

                <div className="mt-4">
                  {/* {show == true ? (
                    <div>
                      <FormGroup>
                        <label>Object</label>

                        <Input
                          placeholder="Object Here..."
                          type="text"
                          onFocus={(e) => setEmailContact4Focus(true)}
                          onBlur={(e) => setEmailContact4Focus(false)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label>Your message</label>
                        <Input
                          id="message-3"
                          name="message"
                          rows="6"
                          type="textarea"
                          onChange={setConversationMessage}
                        />
                      </FormGroup>{" "}
                    </div>
                  ) : null} */}
                  <div>
                    <FormGroup>
                      <label>Object</label>

                      <Input
                        placeholder="Object Here..."
                        type="text"
                        name="conversationName"
                        id="conversationName"
                        // onFocus={(e) => setEmailContact4Focus(true)}
                        // onBlur={(e) => setEmailContact4Focus(false)}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Your message</label>
                      <Input
                        id="message-3"
                        name="content"
                        rows="6"
                        type="textarea"
                        onChange={handleChange}
                      />
                    </FormGroup>{" "}
                  </div>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Button
                          className="btn-round float-left"
                          color="primary"
                          id="tooltip191750994"
                          type="button"
                          // onClick={showMessageBox}
                          onClick={createNewConversation}
                        >
                          Send text
                        </Button>{" "}
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Col>

              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    {userinfo.pictureName === undefined ? (
                      <img
                        src={"../no_image.jpg"}
                        className="img-center img-fluid rounded-circle"
                        alt="sample Image"
                      />
                    ) : (
                      <img
                        src={BCKND_API_IP + "/uploaded_pictures?pic_name=" + userinfo.pictureName}
                        className="img-center img-fluid rounded-circle"
                        alt="sample Image"
                      />
                    )}

                    <h4 className="title">
                      {userinfo.firstName} <br />
                      {userinfo.lastName}
                    </h4>
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

        <DemoFooter />
      </div>
    </>
  );
}
