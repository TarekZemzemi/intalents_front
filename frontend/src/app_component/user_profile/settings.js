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
// react plugin used to create DropdownMenu for selecting items
import Select from "react-select";

// reactstrap components
import {
  Alert,
  Button,
  Label,
  FormGroup,
  Form,
  Input,
  CustomInput,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import DemoFooter from "components/Footers/DemoFooter.js";
import ProfileImgUpload from "./ProfileImgUpload";
import Navbar from "app_component/NavBar/navbar";
import auth from "app_component/authentication/auth";
import { UPDATE_USER } from "constants/api";
import axios from "axios";

export default function Settings() {
  const [profileTabs, setProfileTabs] = React.useState(1);

  const wrapper = React.useRef(null);
  const [userInfo, setUserInfo] = React.useState({});
  const [year, setYear] = React.useState({
    value: "",
    label: "",
  });
  const [month, setMonth] = React.useState({
    value: "",
    label: "",
  });
  const [day, setDay] = React.useState({
    value: "",
    label: "",
  });
  const [gender, setGender] = React.useState({
    value: "",
    label: "",
  });

  const [language, setLanguage] = React.useState({
    value: "",
    label: "",
  });
  const [values, setValues] = React.useState({});

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
    document.body.classList.add("account-settings");
    auth.getUser().then((user) => {
      setValues(user);
      setGender({
        label: user.gender,
        value: user.gender,
      });
      setLanguage({
        label: user.language,
        value: user.language,
      });
      if (user.birthDate != null) {
        setYear({
          value: user.birthDate.substring(0, 4),
          label: user.birthDate.substring(0, 4),
        });
        setMonth({
          value: user.birthDate.substring(5, 7),
          label: user.birthDate.substring(5, 7),
        });
        setDay({
          value: user.birthDate.substring(8, 10),
          label: user.birthDate.substring(8, 10),
        });
      }
    });
    return function cleanup() {
      document.body.classList.remove("account-settings");
    };
  }, []);

  const updateUserHandler = (event) => {
    event.preventDefault();

    const params = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      gender: gender.label,
      adress: values.adress,
      country: values.country,
      city: values.city,
      zipCode: values.zipCode,
      phoneNumber: values.phoneNumber,
      language: language.label,
      description: values.description,
      hourly_rate: values.hourly_rate,
      experience: values.experience,
      job: values.job,
      userProfilePicture: values.userProfilePicture,
      birthDate: year.value + "-" + month.value + "-" + day.value,
    };

    axios
      .put(UPDATE_USER.replace("{user_id}", values.id), params)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <Navbar />
      {/* {console.log(values.id)} */}
      <div className="wrapper" ref={wrapper}>
        <div className="section">
          <Container>
            <Row>
              <Col md="3">
                <div className="section">
                  {/* User Information */}
                  <section className="text-center">
                    <ProfileImgUpload
                      avatar
                      addBtnColor="default"
                      id={values.id}
                      picture={`uploaded_pictures/${values.pictureName}`}
                    />
                    <h3 className="title">
                      {userInfo.firstName} {userInfo.lastName}
                    </h3>
                  </section>
                  {/* User Information */}
                  {/* Profile Sidebar */}
                  <section>
                    <br />
                    <Nav className="flex-column nav-tabs-info" role="tablist">
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: profileTabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setProfileTabs(1);
                          }}
                          href="#pablo"
                        >
                          <i className="tim-icons icon-single-02" /> General
                        </NavLink>
                      </NavItem>
                      <hr className="line-info" />
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: profileTabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setProfileTabs(2);
                          }}
                          href="#pablo"
                        >
                          <i className="tim-icons icon-credit-card" /> Billing
                        </NavLink>
                      </NavItem>
                      <hr className="line-info" />
                    </Nav>
                  </section>
                  {/* End Profile Sidebar */}
                  {/* Profile Completion */}
                  <br />
                  <br />
                  <br />
                  <section>
                    <div className="progress-container progress-info">
                      <span className="progress-badge">Profile Completion</span>
                      <Progress max="100" value="20">
                        <span className="progress-value">100%</span>
                      </Progress>
                    </div>
                  </section>
                  {/* End Profile Completion */}
                </div>
              </Col>
              <Col className="ml-auto" md="8">
                <div className="section">
                  <TabContent activeTab={"profile" + profileTabs}>
                    <TabPane tabId="profile1">
                      <div>
                        <header>
                          <h2 className="text-uppercase">
                            General information
                          </h2>
                        </header>
                        <hr className="line-info" />
                        <br />
                        <Row>
                          <Col className="align-self-center" md="3">
                            <label className="labels" htmlFor="#firstName">
                              First Name
                            </label>
                          </Col>
                          <Col className="align-self-center" md="9">
                            <FormGroup>
                              <Input
                                name="firstName"
                                required="required"
                                value={values.firstName}
                                onChange={handleChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="align-self-center" md="3">
                            <label className="labels" htmlFor="#lastName">
                              Last Name
                            </label>
                          </Col>
                          <Col className="align-self-center" md="9">
                            <FormGroup>
                              <Input
                                id="lastName"
                                name="lastName"
                                required="required"
                                type="text"
                                value={values.lastName}
                                onChange={handleChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="align-self-center" md="3">
                            <label className="labels">I’m</label>
                          </Col>
                          <Col className="align-self-center" md="4">
                            <FormGroup>
                              <Select
                                className="react-select react-select-info"
                                classNamePrefix="react-select"
                                // placeholder={values.gender}
                                name="gender"
                                value={gender}
                                options={[
                                  {
                                    value: "",
                                    label: "Gender",
                                    isDisabled: true,
                                  },
                                  { value: "Male", label: "Male" },
                                  { value: "Female", label: "Female" },
                                ]}
                                onChange={setGender}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="align-self-center" md="3">
                            <label className="labels">Birth Date</label>
                          </Col>
                          <Col className="align-self-center" md="9">
                            <Row>
                              <Col className="align-self-center" md="4">
                                <FormGroup>
                                  <Select
                                    className="react-select react-select-info"
                                    classNamePrefix="react-select"
                                    name="month"
                                    value={month}
                                    options={[
                                      { value: "01", label: "January" },
                                      { value: "02", label: "February" },
                                      { value: "03", label: "March" },
                                      { value: "04", label: "April" },
                                      { value: "05", label: "May" },
                                      { value: "06", label: "June" },
                                      { value: "07", label: "July" },
                                      { value: "08", label: "August" },
                                      { value: "09", label: "September" },
                                      { value: "10", label: "October" },
                                      { value: "11", label: "November" },
                                      { value: "12", label: "December" },
                                    ]}
                                    onChange={setMonth}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="4">
                                <FormGroup>
                                  <Select
                                    className="react-select react-select-info"
                                    classNamePrefix="react-select"
                                    name="day"
                                    value={day}
                                    options={[
                                      { value: "1", label: "1" },
                                      { value: "2", label: "2" },
                                      { value: "3", label: "3" },
                                      { value: "4", label: "4" },
                                      { value: "5", label: "5" },
                                      { value: "6", label: "6" },
                                      { value: "7", label: "7" },
                                      { value: "8", label: "8" },
                                      { value: "9", label: "9" },
                                      { value: "10", label: "10" },
                                      { value: "11", label: "11" },
                                      { value: "12", label: "12" },
                                      { value: "13", label: "13" },
                                      { value: "14", label: "14" },
                                      { value: "15", label: "15" },
                                      { value: "16", label: "16" },
                                      { value: "17", label: "17" },
                                      { value: "18", label: "18" },
                                      { value: "19", label: "19" },
                                      { value: "20", label: "20" },
                                      { value: "21", label: "21" },
                                      { value: "22", label: "22" },
                                      { value: "23", label: "23" },
                                      { value: "24", label: "24" },
                                      { value: "25", label: "25" },
                                      { value: "26", label: "26" },
                                      { value: "27", label: "27" },
                                      { value: "28", label: "28" },
                                      { value: "29", label: "29" },
                                      { value: "30", label: "30" },
                                      { value: "31", label: "31" },
                                    ]}
                                    onChange={setDay}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="4">
                                <FormGroup>
                                  <Select
                                    className="react-select react-select-info"
                                    classNamePrefix="react-select"
                                    value={year}
                                    options={[
                                      { value: "1986", label: "1986" },
                                      { value: "1987", label: "1987" },
                                      { value: "1988", label: "1988" },
                                      { value: "1989", label: "1989" },
                                      { value: "1990", label: "1990" },
                                      { value: "1991", label: "1991" },
                                      { value: "1992", label: "1992" },
                                      { value: "1993", label: "1993" },
                                      { value: "1994", label: "1994" },
                                      { value: "1995", label: "1995" },
                                      { value: "1996", label: "1996" },
                                      { value: "1997", label: "1997" },
                                      { value: "1998", label: "1998" },
                                      { value: "1999", label: "1999" },
                                      { value: "2000", label: "2000" },
                                      { value: "2001", label: "2001" },
                                      { value: "2002", label: "2002" },
                                      { value: "2003", label: "2003" },
                                      { value: "2004", label: "2004" },
                                      { value: "2005", label: "2005" },
                                      { value: "2006", label: "2006" },
                                      { value: "2007", label: "2007" },
                                      { value: "2008", label: "2008" },
                                      { value: "2009", label: "2009" },
                                      { value: "2010", label: "2010" },
                                      { value: "2011", label: "2011" },
                                      { value: "2012", label: "2012" },
                                      { value: "2013", label: "2013" },
                                      { value: "2014", label: "2014" },
                                      { value: "2015", label: "2015" },
                                      { value: "2016", label: "2016" },
                                      { value: "2017", label: "2017" },
                                      { value: "2018", label: "2018" },
                                      { value: "2019", label: "2019" },
                                    ]}
                                    onChange={setYear}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="align-self-center" md="3">
                            <label className="labels" htmlFor="#email">
                              Email
                            </label>
                          </Col>
                          <Col className="align-self-center" md="9">
                            <FormGroup>
                              <Input
                                value={values.email}
                                id="email"
                                name="email"
                                required="required"
                                type="email"
                                onChange={handleChange}
                                disabled
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col className="align-self-center" md="3">
                            <label className="labels" htmlFor="#location">
                              Your adress
                            </label>
                          </Col>
                          <Col className="align-self-center" md="9">
                            <FormGroup>
                              <Input
                                id="location"
                                name="adress"
                                required="required"
                                type="text"
                                value={values.adress}
                                onChange={handleChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="align-self-center" md="3">
                            <label className="labels" htmlFor="#country">
                              Your country
                            </label>
                          </Col>
                          <Col className="align-self-center" md="9">
                            <FormGroup>
                              <Input
                                id="country"
                                name="country"
                                required="required"
                                type="text"
                                value={values.country}
                                onChange={handleChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="align-self-center" md="3">
                            <label className="labels" htmlFor="#city">
                              Your city
                            </label>
                          </Col>
                          <Col className="align-self-center" md="9">
                            <FormGroup>
                              <Input
                                id="country"
                                name="city"
                                required="required"
                                type="text"
                                value={values.city}
                                onChange={handleChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="align-self-center" md="3">
                            <label className="labels" htmlFor="#zipCode">
                              Zip Code
                            </label>
                          </Col>
                          <Col className="align-self-center" md="9">
                            <FormGroup>
                              <Input
                                id="zipCode"
                                name="zipCode"
                                required="required"
                                type="number"
                                value={values.zipCode}
                                onChange={handleChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="align-self-center" md="3">
                            <label className="labels" htmlFor="#phone">
                              Phone Number
                            </label>
                          </Col>
                          <Col className="align-self-center" md="4">
                            <FormGroup>
                              <Input
                                placeholder="enter your phone number"
                                id="phone"
                                name="phoneNumber"
                                required="required"
                                type="tel"
                                value={values.phoneNumber}
                                onChange={handleChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="align-self-center" md="3">
                            <label className="labels">Language</label>
                          </Col>
                          <Col className="align-self-center" md="4">
                            <FormGroup>
                              <Select
                                className="react-select react-select-info"
                                classNamePrefix="react-select"
                                options={[
                                  { value: "English", label: "English" },
                                  { value: "French", label: "French" },
                                  { value: "Spanish", label: "Spanish" },
                                  { value: "Deutsche", label: "Deutsche" },
                                  { value: "Russian", label: "Russian" },
                                ]}
                                name="language"
                                value={language}
                                onChange={setLanguage}
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col className="align-self-center" md="3">
                            <label className="labels" htmlFor="#job">
                              Job
                            </label>
                          </Col>
                          <Col className="align-self-center" md="4">
                            <FormGroup>
                              <Input
                                id="job"
                                name="job"
                                required="required"
                                type="text"
                                value={values.job}
                                onChange={handleChange}
                              />
                            </FormGroup>
                          </Col>

                          <Col className="align-self-center" md="0">
                            <label className="labels">Hourly rate</label>
                          </Col>
                          <Col className="align-self-center" md="3">
                            <FormGroup>
                              <Input
                                placeholder="enter your hourly rate"
                                id="hourly_rate"
                                name="hourly_rate"
                                required="required"
                                type="number"
                                value={values.hourly_rate}
                                onChange={handleChange}
                              />{" "}
                            </FormGroup>
                          </Col>
                          <Col className="align-self-center">$</Col>
                        </Row>

                        <Row>
                          <Col className="align-self-center" md="3">
                            <label className="labels">Description</label>
                          </Col>
                          <Col className="align-self-center" md="9">
                            <FormGroup>
                              <Input
                                cols="80"
                                name="description"
                                placeholder="You can describe yourself here..."
                                rows="4"
                                type="textarea"
                                value={values.description}
                                onChange={handleChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row className="mt-4">
                          <Col md="6">
                            <Button
                              color="info"
                              type="button"
                              onClick={updateUserHandler}
                            >
                              Save Changes
                            </Button>
                            <Button
                              className="btn-simple ml-1"
                              color="info"
                              type="button"
                            >
                              Cancel
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </TabPane>
                    <TabPane tabId="profile2">
                      <header>
                        <h2 className="text-uppercase">Billing method</h2>
                      </header>
                      <hr className="line-info" />
                      <br />
                      <Table className="align-items-center">
                        <thead>
                          <tr>
                            <th scope="col">Card Type</th>
                            <th scope="col">Card Number</th>
                            <th scope="col">Payment Method</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">
                              <img
                                alt="..."
                                className="avatar"
                                src={require("assets/img/visas.png").default}
                              />
                            </th>
                            <td>
                              <span className="d-block">
                                •••• •••• •••• 8372
                              </span>
                              <small className="text-muted">Exp: 06/22</small>
                            </td>
                            <td className="text-center">
                              <FormGroup check className="form-check-radio">
                                <Label check>
                                  <Input
                                    defaultChecked
                                    defaultValue="option2"
                                    id="Radios"
                                    name="exampleRadios"
                                    type="radio"
                                  />
                                  <span className="form-check-sign" />
                                </Label>
                              </FormGroup>
                            </td>
                            <td>
                              <Button
                                className="btn-simple"
                                color="danger"
                                size="sm"
                                type="button"
                              >
                                <i className="tim-icons icon-simple-remove" />{" "}
                                Remove card
                              </Button>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <img
                                alt="..."
                                className="avatar"
                                src={
                                  require("assets/img/mastercard.png").default
                                }
                              />
                            </th>
                            <td>
                              <span className="d-block">
                                •••• •••• •••• 1225
                              </span>
                              <small className="text-muted">Exp: 07/21</small>
                            </td>
                            <td className="text-center">
                              <FormGroup check className="form-check-radio">
                                <Label check>
                                  <Input
                                    defaultValue="option1"
                                    id="Radios"
                                    name="exampleRadios"
                                    type="radio"
                                  />
                                  <span className="form-check-sign" />
                                </Label>
                              </FormGroup>
                            </td>
                            <td>
                              <Button
                                className="btn-simple"
                                color="danger"
                                size="sm"
                                type="button"
                              >
                                <i className="tim-icons icon-simple-remove" />{" "}
                                Remove card
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      <Button color="info" size="sm" type="button">
                        <i className="tim-icons icon-simple-add" /> Add card
                      </Button>
                    </TabPane>
                    <TabPane tabId="profile3">
                      <div className="g-pos-rel h-100 g-brd-around g-brd-gray-light-v7 g-rounded-4 g-pa-15 g-pa-30--md">
                        <header>
                          <h2 className="text-uppercase g-font-size-12 g-font-size-default--md g-color-black mb-0">
                            Security Questions
                          </h2>
                        </header>
                        <hr className="line-info" />
                        <Form>
                          <Row>
                            <Col md="6">
                              <label>Security Question</label>
                              <FormGroup>
                                <Select
                                  className="react-select react-select-info"
                                  classNamePrefix="react-select"
                                  placeholder="Question"
                                  options={[
                                    {
                                      value: "",
                                      label: "Your Question",
                                      isDisabled: true,
                                    },
                                    { value: "2", label: "Question 1" },
                                    { value: "3", label: "Question 2" },
                                    { value: "4", label: "Question 3" },
                                  ]}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <label>Your Answer</label>
                              <FormGroup>
                                <Input
                                  placeholder="Enter your answer"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <br />
                          <br />
                          <header>
                            <h2 className="text-uppercase">
                              Security Settings
                            </h2>
                          </header>
                          <hr className="line-info" />
                          <FormGroup className="d-flex align-items-center justify-content-between">
                            <span>Notify me via email when logging in</span>
                            <CustomInput
                              defaultChecked
                              type="switch"
                              id="switch-1"
                            />
                          </FormGroup>
                          <FormGroup className="d-flex align-items-center justify-content-between">
                            <span>
                              Send SMS confirmation for all online payments
                            </span>
                            <CustomInput
                              defaultChecked
                              type="switch"
                              id="switch-2"
                            />
                          </FormGroup>
                          <FormGroup className="d-flex align-items-center justify-content-between">
                            <span>
                              Check which devices accessed your account
                            </span>
                            <CustomInput type="switch" id="switch-3" />
                          </FormGroup>
                          <FormGroup className="d-flex align-items-center justify-content-between">
                            <span>
                              Find My Device, make sure your device can be found
                              if it gets lost
                            </span>
                            <CustomInput
                              defaultChecked
                              type="switch"
                              id="switch-4"
                            />
                          </FormGroup>
                          <FormGroup className="d-flex align-items-center justify-content-between">
                            <span>
                              Lock your device with a PIN, pattern, or password
                            </span>
                            <CustomInput
                              defaultChecked
                              type="switch"
                              id="switch-5"
                            />
                          </FormGroup>
                          <FormGroup className="d-flex align-items-center justify-content-between">
                            <span>
                              Manage what apps have access to app-usage data on
                              your device
                            </span>
                            <CustomInput type="switch" id="switch-6" />
                          </FormGroup>
                          <Row className="mt-5 justify-content-end">
                            <Col className="ml-auto" md="4">
                              <Button
                                className="btn-simple mr-1"
                                color="info"
                                size="sm"
                                type="button"
                              >
                                Cancel
                              </Button>
                              <Button color="info" size="sm" type="button">
                                Save Changes
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                    </TabPane>
                    <TabPane tabId="profile4">
                      <Container>
                        <Row>
                          <Col xs="12">
                            <Alert className="text-small" color="info">
                              <i className="icon-shield" />
                              <span>
                                We will never distribute your email address to
                                third parties. Read about email communication in
                                our privacy policy.
                              </span>
                            </Alert>
                          </Col>
                          {/*end of col*/}
                        </Row>
                        <hr />
                        <Row>
                          <Col xs="12">
                            <Form>
                              <h5 className="mb-4">Notification Preferences</h5>
                              <FormGroup check>
                                <Label check>
                                  <Input defaultChecked type="checkbox" />
                                  <span className="form-check-sign" />
                                  Someone mentions me
                                </Label>
                              </FormGroup>
                              <FormGroup check>
                                <Label check>
                                  <Input defaultChecked type="checkbox" />
                                  <span className="form-check-sign" />
                                  Someone follows me
                                </Label>
                              </FormGroup>
                              <FormGroup check>
                                <Label check>
                                  <Input type="checkbox" />
                                  <span className="form-check-sign" />
                                  Someone shares my activty
                                </Label>
                              </FormGroup>
                              <FormGroup check>
                                <Label check>
                                  <Input type="checkbox" />
                                  <span className="form-check-sign" />
                                  Someone messages me
                                </Label>
                              </FormGroup>
                              <FormGroup check>
                                <Label check>
                                  <Input type="checkbox" />
                                  <span className="form-check-sign" />
                                  Someone adds me to a project
                                </Label>
                              </FormGroup>
                              <FormGroup check>
                                <Label check>
                                  <Input type="checkbox" />
                                  <span className="form-check-sign" />
                                  Sales and promotions
                                </Label>
                              </FormGroup>
                              <Button
                                className="mt-4"
                                color="info"
                                size="sm"
                                type="button"
                              >
                                Update preferences
                              </Button>
                            </Form>
                          </Col>
                          {/*end of col*/}
                        </Row>
                        {/*end of row*/}
                        <hr />
                        <Row>
                          <Col xs="12">
                            <Form>
                              <h5>Notification Frequency</h5>
                              <FormGroup check className="form-check-radio">
                                <Label check>
                                  <Input
                                    defaultValue="option1"
                                    id="exampleF1"
                                    name="exampleRadios"
                                    type="radio"
                                  />
                                  <span className="form-check-sign" />
                                  Daily
                                </Label>
                              </FormGroup>
                              <FormGroup check className="form-check-radio">
                                <Label check>
                                  <Input
                                    defaultChecked
                                    defaultValue="option2"
                                    id="exampleF2"
                                    name="exampleRadios"
                                    type="radio"
                                  />
                                  <span className="form-check-sign" />
                                  Weekly
                                </Label>
                              </FormGroup>
                              <FormGroup check className="form-check-radio">
                                <Label check>
                                  <Input
                                    defaultValue="option3"
                                    id="exampleF3"
                                    name="exampleRadios"
                                    type="radio"
                                  />
                                  <span className="form-check-sign" />
                                  Monthly
                                </Label>
                              </FormGroup>
                              <FormGroup check className="form-check-radio">
                                <Label check>
                                  <Input
                                    defaultValue="option4"
                                    id="exampleF4"
                                    name="exampleRadios"
                                    type="radio"
                                  />
                                  <span className="form-check-sign" />
                                  Never
                                </Label>
                              </FormGroup>
                              <Button
                                className="mt-4"
                                color="info"
                                size="sm"
                                type="button"
                              >
                                Update
                              </Button>
                            </Form>
                          </Col>
                          {/*end of col*/}
                        </Row>
                        {/*end of row*/}
                      </Container>
                    </TabPane>
                  </TabContent>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <DemoFooter />
      </div>
    </>
  );
}
