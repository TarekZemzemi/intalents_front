import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-pro-react.scss?v1.2.0";
import "assets/demo/demo.css";
import "assets/demo/react-demo.css";

// presentation pages
import Index from "views/Index.js";
import Presentation from "views/Presentation.js";
import Sections from "views/Sections.js";
// example pages
import AboutUs from "views/examples/AboutUs.js";
import BlogPost from "views/examples/BlogPost.js";
import BlogPosts from "views/examples/BlogPosts.js";
import ContactUs from "views/examples/ContactUs.js";
import LandingPage from "views/examples/LandingPage.js";
import Pricing from "views/examples/Pricing.js";
import Ecommerce from "views/examples/Ecommerce.js";
import ProductPage from "views/examples/ProductPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import Error404 from "views/examples/Error404.js";
import Error500 from "views/examples/Error500.js";
import AccountSettings from "views/examples/AccountSettings.js";
import LoginPage from "views/examples/LoginPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ResetPage from "views/examples/ResetPage.js";
import InvoicePage from "views/examples/InvoicePage.js";
import CheckoutPage from "views/examples/CheckoutPage.js";
import ChatPage from "views/examples/ChatPage.js";
import Register from "../src/app_component/authentication/Register";
import Login from "../src/app_component/authentication/Login";
import PostAdd from "../src/app_component/post/post_add";
import Profile from "../src/app_component/user_profile/profile";
import Settings from "../src/app_component/user_profile/settings";
import Home from "../src/app_component/home/home";
import SignupRedirection from "../src/app_component/authentication/signup_redirection";
import RegisterClient from "../src/app_component/authentication/register_client";
import CheckProfile from "../src/app_component/user_profile/checkProfile";
import Message from "../src/app_component/chat/messages";
import Talents from "../src/app_component/home/talents";
import Welcome from "../src/app_component/home/welcome";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" render={(props) => <Index {...props} />} />
      <Route
        path="/presentation"
        render={(props) => <Presentation {...props} />}
      />
      <Route path="/sections" render={(props) => <Sections {...props} />} />
      <Route path="/about-us" render={(props) => <AboutUs {...props} />} />
      <Route path="/blog-post" render={(props) => <BlogPost {...props} />} />
      <Route path="/blog-posts" render={(props) => <BlogPosts {...props} />} />
      <Route path="/contact-us" render={(props) => <ContactUs {...props} />} />
      <Route
        path="/landing-page"
        render={(props) => <LandingPage {...props} />}
      />
      <Route path="/pricing" render={(props) => <Pricing {...props} />} />
      <Route path="/ecommerce" render={(props) => <Ecommerce {...props} />} />
      <Route
        path="/product-page"
        render={(props) => <ProductPage {...props} />}
      />
      <Route
        path="/profile-page"
        render={(props) => <ProfilePage {...props} />}
      />
      <Route path="/404-error" render={(props) => <Error404 {...props} />} />
      <Route path="/500-error" render={(props) => <Error500 {...props} />} />
      <Route
        path="/account-settings"
        render={(props) => <AccountSettings {...props} />}
      />
      <Route path="/login-page" render={(props) => <LoginPage {...props} />} />
      <Route
        path="/register-page"
        render={(props) => <RegisterPage {...props} />}
      />
      <Route path="/reset-page" render={(props) => <ResetPage {...props} />} />
      <Route
        path="/invoice-page"
        render={(props) => <InvoicePage {...props} />}
      />
      <Route
        path="/checkout-page"
        render={(props) => <CheckoutPage {...props} />}
      />
      <Route path="/chat-page" render={(props) => <ChatPage {...props} />} />
      #----------------register and login -----------------------#
      <Route path="/register" render={(props) => <Register {...props} />} />
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Route
        path="/signup_red"
        render={(props) => <SignupRedirection {...props} />}
      />
      <Route
        path="/signup_client"
        render={(props) => <RegisterClient {...props} />}
      />
      <Route
        path="/profile/:id"
        render={(props) => <CheckProfile {...props} />}
      />
      #-------post-route--------------------#
      <Route path="/post_add" render={(props) => <PostAdd {...props} />} />
      <Route path="/profile" render={(props) => <Profile {...props} />} />
      <Route
        path="/user-settings"
        render={(props) => <Settings {...props} />}
      />
      #-------chat route---------------#{" "}
      <Route path="/messages" render={(props) => <Message {...props} />} />
      #-------------Home route-----------------#
      <Route path="/home" render={(props) => <Home {...props} />} />
      <Route path="/talents" render={(props) => <Talents {...props} />} />
      <Route path="/welcome" render={(props) => <Welcome {...props} />} />
      <Redirect from="/" to="/welcome" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
