import React from "react";
import {
  CardBody,
  CardTitle,
  CardFooter,
  Button,
  Col,
  Card,
  CardHeader,
  Container,
  Row,
  FormGroup,
  Input,
} from "reactstrap";
import Navbar from "app_component/NavBar/navbar";
import DemoFooter from "components/Footers/DemoFooter.js";
import { GET_USERS } from "constants/api";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Talents() {
  const [users, setUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    get_users();
  }, []);

  const get_users = () => {
    axios.get(GET_USERS).then((response) => {
      setUsers(response.data);
    });
  };
  const style = {
    color: "white",
    display: "inline-block",
    "padding-top": "0px",
  };
  return (
    <>
      <Navbar />
      <div className="cards">
        <div className="section blogs-3 pt-0 ">
          <Container>
            <div className="title">
              <h3>
                <Row>
                  <Col lg="4">
                    {" "}
                    <small>In-Talents Profiles</small>{" "}
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Input
                        defaultValue=""
                        placeholder="Search Talents by keyword"
                        type="text"
                        onChange={(event) => {
                          setSearchTerm(event.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </h3>
            </div>
            <Row>
              {users
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.job.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((user) => {
                  return (
                    <Col lg="3">
                      <Card
                        className="card-blog card-background"
                        data-animation="zooming"
                      >
                        <div
                          className="full-background"
                          style={{
                            backgroundImage:
                              "url(" +
                              "uploaded_pictures/" +
                              user.pictureName +
                              ")",
                          }}
                        />
                        <CardBody>
                          <div className="content-bottom">
                            <h6 className="card-category">
                              {user.country},{user.city}
                            </h6>
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <CardTitle tag="h3">{user.firstName}</CardTitle>
                            </a>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  );
                })}{" "}
            </Row>
          </Container>
        </div>

        <DemoFooter />
      </div>
    </>
  );
}
