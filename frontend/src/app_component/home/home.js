import React from "react";
import Slider from "nouislider";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  CustomInput,
  FormGroup,
  Input,
} from "reactstrap";
import Navbar from "app_component/NavBar/navbar";
import DemoFooter from "components/Footers/DemoFooter.js";
import axios from "axios";
import { GET_USERS_POSTS } from "constants/api";

export default function Home() {
  const [postCreators, setPostCreators] = React.useState([]);
  const slider1 = React.useRef(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [checkedListRadio, setCheckedListRadio] = React.useState([]);
  const languages = [
    { id: 1, name: "English" },
    { id: 2, name: "French" },
    { id: 3, name: "Arabic" },
    { id: 4, name: "Spanish" },
  ];

  React.useEffect(() => {
    axios.get(GET_USERS_POSTS).then((res) => {
      let posts = res.data;
      setPostCreators(posts);
      console.log(posts);
    });

    Slider.create(slider1.current, {
      start: [40],
      connect: [true, false],
      step: 1,
      range: { min: 0, max: 100 },
    });
  }, []);

  const handleToggleRadio = (value) => {
    const currentIndex = checkedListRadio.indexOf(value);
    const newChecked = [...checkedListRadio];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedListRadio(newChecked);
  };

  return (
    <>
      <Navbar />
      <div className="cd-section" id="blogs">
        <div className="section blogs-3 pt-0 ">
          <Container>
            <Col>
              <Row>
                <Col className="mr-0" md="4">
                  <h2 className="title" className="pr-2 mr-2">
                    Latest Job Offer
                  </h2>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Input
                      defaultValue=""
                      placeholder="Search Job by keyword"
                      type="text"
                      onChange={(event) => {
                        setSearchTerm(event.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className=" pt-5 px-0 " lg="3">
                  <Col className=" pt-2">
                    <Card className="card-product ">
                      <CardBody>
                        <CardTitle tag="h4">
                          <a href="#b">Apply filters</a>
                        </CardTitle>

                        <br />
                        <Col sm="8">
                          <h7>Language</h7>

                          <CustomInput
                            type="switch"
                            id={languages[0].id}
                            label={languages[0].name}
                            className="pt-2 "
                            onChange={() => {
                              handleToggleRadio(languages[0].id);
                            }}
                          />
                          <CustomInput
                            type="switch"
                            id={languages[1].id}
                            className="pt-2"
                            label={languages[1].name}
                            onChange={() => {
                              handleToggleRadio(languages[1].id);
                            }}
                          />
                          <CustomInput
                            type="switch"
                            id={languages[2].id}
                            className="pt-2"
                            label={languages[2].name}
                            onChange={() => {
                              handleToggleRadio(languages[2].id);
                            }}
                          />
                          <CustomInput
                            type="switch"
                            id={languages[3].id}
                            className="pt-2 mb-2"
                            label={languages[3].name}
                            onChange={() => {
                              handleToggleRadio(languages[3].id);
                            }}
                          />
                          <h8>Hourly rate $</h8>
                          <div
                            className="slider"
                            ref={slider1}
                            className="mt-2"
                          />
                          <br />
                        </Col>
                      </CardBody>
                    </Card>
                  </Col>
                </Col>
                <Col className="ml-auto mr-3" md="8">
                  {checkedListRadio.indexOf(1) === -1 &&
                  checkedListRadio.indexOf(2) === -1 &&
                  checkedListRadio.indexOf(3) === -1 &&
                  checkedListRadio.indexOf(4) === -1
                    ? postCreators
                        .filter((val) => {
                          if (searchTerm == "") {
                            return val;
                          } else if (
                            val.Post.title
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          ) {
                            return val;
                          }
                        })
                        .map((p, index) => {
                          //filter by job key word
                          return (
                            <Card
                              className="card-blog card-plain blog-horizontal"
                              key={index}
                            >
                              <Row>
                                <Col lg="8">
                                  <CardBody>
                                    <CardTitle tag="h3">
                                      <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        {p.Post.title}
                                      </a>
                                    </CardTitle>
                                    <div className="author">
                                      <Link to={`/profile/${p.id}`}>
                                        {p.pictureName == undefined ? (
                                          <img
                                            src={"no_image.jpg"}
                                            className="avatar img-raised"
                                            alt="sample Image"
                                          />
                                        ) : (
                                          <img
                                            src={
                                              "uploaded_pictures/" +
                                              p.pictureName
                                            }
                                            className="avatar img-raised"
                                            alt="sample Image"
                                          />
                                        )}
                                      </Link>

                                      <div className="text">
                                        <Link to={`/profile/${p.id}`}>
                                          {p.username}
                                        </Link>

                                        <div className="meta">
                                          published on{" "}
                                          {p.Post.date_created.substring(0, 10)}
                                        </div>
                                      </div>
                                    </div>
                                    <p className="card-description">
                                      {p.Post.description}
                                      <br />

                                      <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        Read More
                                      </a>
                                    </p>
                                    <div className="text">
                                      <h5 className="category text-primary">
                                        Required language :{" "}
                                        <strong>{p.Post.language}</strong>
                                      </h5>
                                    </div>
                                  </CardBody>
                                </Col>
                                <Col lg="3" className="pt-5">
                                  {p.Post.post_teaser_picture_name == null ? (
                                    <div
                                      className="card-image"
                                      className="pt-5"
                                    >
                                      <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        <img
                                          alt="..."
                                          className="img rounded"
                                          src={
                                            require("assets/img/serge-kutuzov.jpg")
                                              .default
                                          }
                                        />
                                      </a>
                                    </div>
                                  ) : (
                                    <div
                                      className="card-image"
                                      className="pt-5"
                                    >
                                      <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        <img
                                          alt="..."
                                          className="img rounded"
                                          src={
                                            "uploaded_pictures/" +
                                            p.Post.post_teaser_picture_name
                                          }
                                        />
                                      </a>
                                    </div>
                                  )}
                                </Col>
                              </Row>
                            </Card>
                          );
                        })
                    : checkedListRadio.indexOf(languages[0].id) != -1
                    ? postCreators //filter for english language
                        .filter((p) => p.Post.language === languages[0].name)
                        .map((p, index) => {
                          return (
                            <Card
                              className="card-blog card-plain blog-horizontal"
                              key={index}
                            >
                              <Row>
                                <Col lg="8">
                                  <CardBody>
                                    <CardTitle tag="h3">
                                      <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        {p.Post.title}
                                      </a>
                                    </CardTitle>
                                    <div className="author">
                                      <img
                                        alt="..."
                                        className="avatar img-raised"
                                        src={
                                          require("assets/img/julie.jpg")
                                            .default
                                        }
                                      />
                                      <div className="text">
                                        {p.username}
                                        <div className="meta">
                                          published on{" "}
                                          {p.Post.date_created.substring(0, 10)}
                                        </div>
                                      </div>
                                    </div>
                                    <p className="card-description">
                                      {p.Post.description}
                                      <br />

                                      <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        Read More
                                      </a>
                                    </p>
                                    <div className="text">
                                      <h5 className="category text-primary">
                                        Required language :{" "}
                                        <strong>{p.Post.language}</strong>
                                      </h5>
                                    </div>
                                  </CardBody>
                                </Col>
                                <Col lg="3" className="pt-5">
                                  <div className="card-image" className="pt-5">
                                    <a
                                      href="#pablo"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <img
                                        alt="..."
                                        className="img rounded"
                                        src={
                                          require("assets/img/serge-kutuzov.jpg")
                                            .default
                                        }
                                      />
                                    </a>
                                  </div>
                                </Col>
                              </Row>
                            </Card>
                          );
                        })
                    : checkedListRadio.indexOf(languages[1].id) != -1
                    ? postCreators
                        //filter for the french language
                        .filter(
                          (post) => post.Post.language === languages[1].name
                        )
                        .map((p, index) => {
                          return (
                            <Card
                              className="card-blog card-plain blog-horizontal"
                              key={index}
                            >
                              <Row>
                                <Col lg="8">
                                  <CardBody>
                                    <CardTitle tag="h3">
                                      <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        {p.Post.title}
                                      </a>
                                    </CardTitle>
                                    <div className="author">
                                      <img
                                        alt="..."
                                        className="avatar img-raised"
                                        src={
                                          require("assets/img/julie.jpg")
                                            .default
                                        }
                                      />
                                      <div className="text">
                                        {p.username}
                                        <div className="meta">
                                          published on{" "}
                                          {p.Post.date_created.substring(0, 10)}
                                        </div>
                                      </div>
                                    </div>
                                    <p className="card-description">
                                      {p.Post.description}
                                      <br />

                                      <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        Read More
                                      </a>
                                    </p>
                                    <div className="text">
                                      <h5 className="category text-primary">
                                        Required language :{" "}
                                        <strong>{p.Post.language}</strong>
                                      </h5>
                                    </div>
                                  </CardBody>
                                </Col>
                                <Col lg="3" className="pt-5">
                                  <div className="card-image" className="pt-5">
                                    <a
                                      href="#pablo"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <img
                                        alt="..."
                                        className="img rounded"
                                        src={
                                          require("assets/img/serge-kutuzov.jpg")
                                            .default
                                        }
                                      />
                                    </a>
                                  </div>
                                </Col>
                              </Row>
                            </Card>
                          );
                        })
                    : checkedListRadio.indexOf(languages[2].id) != -1
                    ? postCreators
                        .filter(
                          //filter for the arabic language
                          (post) => post.Post.language === languages[2].name
                        )
                        .map((p, index) => {
                          return (
                            <Card
                              className="card-blog card-plain blog-horizontal"
                              key={index}
                            >
                              <Row>
                                <Col lg="8">
                                  <CardBody>
                                    <CardTitle tag="h3">
                                      <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        {p.Post.title}
                                      </a>
                                    </CardTitle>
                                    <div className="author">
                                      <img
                                        alt="..."
                                        className="avatar img-raised"
                                        src={
                                          require("assets/img/julie.jpg")
                                            .default
                                        }
                                      />
                                      <div className="text">
                                        {p.username}
                                        <div className="meta">
                                          published on{" "}
                                          {p.Post.date_created.substring(0, 10)}
                                        </div>
                                      </div>
                                    </div>
                                    <p className="card-description">
                                      {p.Post.description}
                                      <br />

                                      <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        Read More
                                      </a>
                                    </p>
                                    <div className="text">
                                      <h5 className="category text-primary">
                                        Required language :{" "}
                                        <strong>{p.Post.language}</strong>
                                      </h5>
                                    </div>
                                  </CardBody>
                                </Col>
                                <Col lg="3" className="pt-5">
                                  <div className="card-image" className="pt-5">
                                    <a
                                      href="#pablo"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <img
                                        alt="..."
                                        className="img rounded"
                                        src={
                                          require("assets/img/serge-kutuzov.jpg")
                                            .default
                                        }
                                      />
                                    </a>
                                  </div>
                                </Col>
                              </Row>
                            </Card>
                          );
                        })
                    : checkedListRadio.indexOf(languages[3].id) != -1
                    ? postCreators
                        .filter(
                          // filter for the spanish language
                          (post) => post.Post.language === languages[3].name
                        )
                        .map((p, index) => {
                          return (
                            <Card
                              className="card-blog card-plain blog-horizontal"
                              key={index}
                            >
                              <Row>
                                <Col lg="8">
                                  <CardBody>
                                    <CardTitle tag="h3">
                                      <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        {p.Post.title}
                                      </a>
                                    </CardTitle>
                                    <div className="author">
                                      <img
                                        alt="..."
                                        className="avatar img-raised"
                                        src={
                                          require("assets/img/julie.jpg")
                                            .default
                                        }
                                      />
                                      <div className="text">
                                        {p.username}
                                        <div className="meta">
                                          published on{" "}
                                          {p.Post.date_created.substring(0, 10)}
                                        </div>
                                      </div>
                                    </div>
                                    <p className="card-description">
                                      {p.Post.description}
                                      <br />

                                      <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        Read More
                                      </a>
                                    </p>
                                    <div className="text">
                                      <h5 className="category text-primary">
                                        Required language :{" "}
                                        <strong>{p.Post.language}</strong>
                                      </h5>
                                    </div>
                                  </CardBody>
                                </Col>
                                <Col lg="3" className="pt-5">
                                  <div className="card-image" className="pt-5">
                                    <a
                                      href="#pablo"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <img
                                        alt="..."
                                        className="img rounded"
                                        src={
                                          require("assets/img/serge-kutuzov.jpg")
                                            .default
                                        }
                                      />
                                    </a>
                                  </div>
                                </Col>
                              </Row>
                            </Card>
                          );
                        })
                    : // filter for the english , french and arabic languages
                    checkedListRadio.indexOf(languages[0].id) != -1 &&
                      checkedListRadio.indexOf(languages[1].id) != -1 &&
                      checkedListRadio.indexOf(languages[2].id) != -1
                    ? postCreators
                        .filter(
                          (post) =>
                            post.Post.language === languages[0].name &&
                            post.Post.language === languages[1].name &&
                            post.Post.language === languages[2].name
                        )
                        .map((p, index) => {
                          return (
                            <Card
                              className="card-blog card-plain blog-horizontal"
                              key={index}
                            >
                              <Row>
                                <Col lg="8">
                                  <CardBody>
                                    <CardTitle tag="h3">
                                      <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        {p.Post.title}
                                      </a>
                                    </CardTitle>
                                    <div className="author">
                                      <img
                                        alt="..."
                                        className="avatar img-raised"
                                        src={
                                          require("assets/img/julie.jpg")
                                            .default
                                        }
                                      />
                                      <div className="text">
                                        {p.username}
                                        <div className="meta">
                                          published on{" "}
                                          {p.Post.date_created.substring(0, 10)}
                                        </div>
                                      </div>
                                    </div>
                                    <p className="card-description">
                                      {p.Post.description}
                                      <br />

                                      <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        Read More
                                      </a>
                                    </p>
                                    <div className="text">
                                      <h5 className="category text-primary">
                                        Required language :{" "}
                                        <strong>{p.Post.language}</strong>
                                      </h5>
                                    </div>
                                  </CardBody>
                                </Col>
                                <Col lg="3" className="pt-5">
                                  <div className="card-image" className="pt-5">
                                    <a
                                      href="#pablo"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <img
                                        alt="..."
                                        className="img rounded"
                                        src={
                                          require("assets/img/serge-kutuzov.jpg")
                                            .default
                                        }
                                      />
                                    </a>
                                  </div>
                                </Col>
                              </Row>
                            </Card>
                          );
                        })
                    : null}
                </Col>
              </Row>
            </Col>
          </Container>
        </div>
      </div>{" "}
      <DemoFooter />
    </>
  );
}
