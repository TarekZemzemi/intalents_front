import { GET_USER_INFO } from "constants/api";
import axios from "axios";

class Auth {
  logout = (callback) => {
    localStorage.removeItem("token");
    localStorage.removeItem("permissions");
    // Using a callback to load '/' when logout is called
    callback();
  };

  getUser = async () => {
    return await this.getUserPromise()
    .then((res) => {
      return res.data
    })
    // Create request to get user info using token
    // const request = new Request(GET_USER_INFO, {
    //   method: "GET",
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // // Fetch request
    // const response = await fetch(request);
    // const data = await response.json();
    // return data;
  };

  getUserPromise = async () => {
    const token = localStorage.getItem("token");
    return await axios
    .get(GET_USER_INFO, {
      headers: {
        accept: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res) => {
      return res
    })
  };

  isAuthenticated = () => {
    const permissions = localStorage.getItem("token");
    if (!permissions) {
      return false;
    }
    else return true;
  };
}

export default new Auth();
