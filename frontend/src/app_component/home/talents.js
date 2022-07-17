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
import { BCKND_API_IP, GET_USERS } from "constants/api";
import axios from "axios";
import { Link } from "react-router-dom";
import defaultImg from "../../assets/img/1234.png";
import CloseIcon from "@material-ui/icons/Close";
export default function Talents() {
  const [users, setUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [model, setModel] = React.useState(false);
  const [tempimgSrc, setTempimgSrc] = React.useState("");
  const getImg = (imgSrc) => {
    setTempimgSrc(imgSrc);
    setModel(true);
  };
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
              <div className={model ? "model open" : "model"}>
                <img src={tempimgSrc} />
                <CloseIcon onClick={() => setModel(false)} />
              </div>
              <div className="gallery">
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
                  .map((user, index) => {
                    {
                      return user.pictureName == undefined ? (
                        <div
                          className="pics"
                          key={index}
                          onClick={() =>
                            getImg(
                              BCKND_API_IP +
                                "/uploaded_pictures?pic_name=" +
                                user.pictureName
                            )
                          }
                        >
                          <img src={"no_image.jpg"} alt="profile picture" />
                        </div>
                      ) : (
                        <div
                          className="pics"
                          key={index}
                          onClick={() =>
                            getImg(
                              BCKND_API_IP +
                                "/uploaded_pictures?pic_name=" +
                                user.pictureName
                            )
                          }
                        >
                          <img
                            src={
                              BCKND_API_IP +
                              "/uploaded_pictures?pic_name=" +
                              user.pictureName
                            }
                          />
                        </div>
                      );
                    }
                  })}{" "}
              </div>
            </Row>
          </Container>
        </div>

        <DemoFooter />
      </div>
    </>
  );
}
