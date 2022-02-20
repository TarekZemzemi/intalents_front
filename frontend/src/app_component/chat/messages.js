/*!

=========================================================
* BLK Design System PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  ListGroupItem,
  ListGroup,
  Media,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import Navbar from "app_component/NavBar/navbar";
import DemoFooter from "components/Footers/DemoFooter.js";
import {
  GET_ALL_CONVERSATIONS,
  GET_MESSAGES_BY_CONVERSATION_ID,
  SEND_MESSAGE,
} from "constants/api";
import axios from "axios";
import auth from "app_component/authentication/auth";

export default function Message() {
  const [searchContact, setSearchContact] = React.useState(undefined);
  const [yourMessage, setYourMessage] = React.useState(undefined);
  const wrapper = React.useRef(null);
  const [userConversations, setUserConversations] = React.useState([]);
  const [userinfo, setUserInfo] = React.useState({});
  const [clicked, setClicked] = React.useState({});
  const [receiverInfo, setReceiverInfo] = React.useState({});
  const [searchKeyWord, setSearchKeyWord] = React.useState("");
  const [selectDiscussionMessages, setSelectedDiscussionMessages] =
    React.useState([]);

  const [values, setValues] = React.useState({
    sendMessage: "",
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = (key) => {
    let clicked = userConversations.filter((f) => f.id === key)[0];
    let messages = [];
    setClicked(clicked);
    setReceiverInfo(clicked.participants[0]);
    /***get messages of specifc conversation */
    axios
      .get(GET_MESSAGES_BY_CONVERSATION_ID.replace("{conversation_id}", key))
      .then((response) => {
        messages = [...response.data];
        let messageReversed = [...messages].reverse();
        setSelectedDiscussionMessages(messageReversed);
      });
  };

  const changeColor = (key) => {
    if (clicked.id === key) {
      return "";
    } else return "";
  };
  const get_all_conversations_by_user_id = (id) => {
    let data = [];
    axios
      .get(GET_ALL_CONVERSATIONS.replace("{user_id}", id))
      .then((response) => {
        data = [...response.data];
        setUserConversations(data);
      });
  };

  const SendMessage = (message) => {
    let messageList = [...selectDiscussionMessages];

    let newMessage = {
      sender_id: userinfo.id,
      content: message,
      created_time: new Date().toLocaleTimeString(),
    };
    messageList.push(newMessage);
    setSelectedDiscussionMessages(messageList);

    const params = {
      content: values.sendMessage,
    };
    axios
      .post(SEND_MESSAGE + userinfo.id + "/" + clicked.id, params)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    wrapper.current.scrollTop = 0;
    document.body.classList.add("chat-page");
    auth.getUser().then((user) => {
      setUserInfo(user);
      get_all_conversations_by_user_id(user.id);
    });

    return function cleanup() {
      document.body.classList.remove("chat-page");
    };
  }, []);
  return (
    <>
      <Navbar />
      <div className="wrapper" ref={wrapper}>
        <div className="section mt-5">
          <Container>
            <h2 className="title">Chat</h2>
            <Row className="flex-row">
              <Col lg="4">
                <Card className="card-plain">
                  <CardHeader className="mb-3">
                    <InputGroup
                      className={classnames("form-control-lg", {
                        "input-group-focus": searchContact,
                      })}
                    >
                      <Input
                        placeholder="Search contact"
                        type="text"
                        onFocus={(e) => setSearchContact(true)}
                        onBlur={(e) => setSearchContact(false)}
                        onChange={(event) => {
                          setSearchKeyWord(event.target.value);
                        }}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <i className="tim-icons icon-zoom-split" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </CardHeader>
                  <ListGroup className="list-group-chat" flush>
                    {[...userConversations]
                      .reverse()
                      .filter((val) => {
                        if (searchKeyWord == "") {
                          return val;
                        } else if (
                          val.participants[0].firstName
                            .toLowerCase()
                            .includes(searchKeyWord.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      .map((conversation) => {
                        return (
                          <ListGroupItem
                            key={conversation.id}
                            href="#pablo"
                            onClick={() => handleClick(conversation.id)}
                            tag="a"
                            className={changeColor(conversation.id)}
                          >
                            <Media>
                              {conversation.participants[0].pictureName ==
                              undefined ? (
                                <img
                                  src={"no_image.jpg"}
                                  className="avatar"
                                  alt="sample Image"
                                />
                              ) : (
                                <img
                                  alt="..."
                                  className="avatar"
                                  src={
                                    "uploaded_pictures/" +
                                    conversation.participants[0].pictureName
                                  }
                                />
                              )}

                              <Media body className="ml-2">
                                <div className="justify-content-between align-items-center">
                                  <h6 className="mb-0">
                                    {conversation.participants[0].firstName}{" "}
                                    {conversation.participants[0].lastName}
                                  </h6>
                                  <div>
                                    <small className="text-muted">
                                      read at{" "}
                                      {conversation.last_msg_read_at.substring(
                                        0,
                                        10
                                      )}{" "}
                                      {conversation.last_msg_read_at.substring(
                                        11,
                                        16
                                      )}
                                    </small>
                                  </div>
                                </div>
                                <Col
                                  className="text-muted text-small p-0 text-truncate d-block"
                                  xs="11"
                                >
                                  {conversation.conversation_name.substring(
                                    0,
                                    20
                                  ) + "..."}
                                </Col>
                              </Media>
                            </Media>
                          </ListGroupItem>
                        );
                      })}
                  </ListGroup>
                </Card>
              </Col>
              <Col lg="8">
                <Card className="card-plain card-chat">
                  <CardHeader className="d-inline-block">
                    <Row>
                      <Col md="10">
                        <Media className="align-items-center">
                          {receiverInfo.pictureName == undefined ? (
                            <img
                              src={"no_image.jpg"}
                              className="avatar"
                              alt="sample Image"
                            />
                          ) : (
                            <img
                              alt="..."
                              className="avatar"
                              src={
                                "uploaded_pictures/" + receiverInfo.pictureName
                              }
                            />
                          )}
                          <Media body>
                            <h6 className="mb-0 d-block">
                              {receiverInfo.firstName} {receiverInfo.lastName}
                            </h6>
                          </Media>
                        </Media>
                      </Col>

                      <Col md="1">
                        <UncontrolledDropdown>
                          <DropdownMenu right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="tim-icons icon-single-02" />
                              Profile
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="tim-icons icon-volume-98" />
                              Mute conversation
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="tim-icons icon-lock-circle" />
                              Block
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="tim-icons icon-chat-33" />
                              Clear chat
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="tim-icons icon-simple-remove" />
                              Delete chat
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* /****connected user messages */}
                    {selectDiscussionMessages.map((message) => {
                      return (
                        <Row
                          className={
                            userinfo.id == message.sender_id
                              ? "justify-content-end"
                              : "justify-content-start text-right"
                          }
                          key={message.id}
                        >
                          <Col xs={{ size: "auto" }}>
                            <Card
                              className={
                                userinfo.id == message.sender_id ? "" : ""
                              }
                            >
                              <CardBody className="">
                                <p className="mb-1">{message.content}</p>
                                <div>
                                  <small className="opacity-60">
                                    <i className="far fa-clock" />{" "}
                                    {message.created_time.substring(0, 10)} at{" "}
                                    {message.created_time.substring(11, 16)}
                                  </small>
                                </div>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      );
                    })}
                  </CardBody>
                  <CardFooter className="d-block">
                    <Form className="align-items-center">
                      <InputGroup
                        className={classnames("d-flex", "form-control-lg", {
                          "input-group-focus": yourMessage,
                        })}
                      >
                        <InputGroupAddon addonType="prepend" className="d-flex">
                          <InputGroupText>
                            <i className="tim-icons icon-pencil" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Your message"
                          type="text"
                          onFocus={(e) => setYourMessage(true)}
                          onBlur={(e) => setYourMessage(false)}
                          onChange={handleChange}
                          name="sendMessage"
                          value={values.sendMessage}
                        />
                        <Button
                          className="btn-simple ml-2"
                          color="primary"
                          onClick={() => {
                            SendMessage(values.sendMessage);
                            setValues({ sendMessage: "" });
                          }}
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </InputGroup>
                    </Form>
                  </CardFooter>
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
