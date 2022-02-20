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
// used for making the prop types of this component
import PropTypes from "prop-types";

import { Button } from "reactstrap";
import auth from "app_component/authentication/auth";

import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";
import { UPLOAD_USER_PICTURE } from "constants/api";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

toast.configure();

export default function ImageUpload({ avatar, addBtnClasses }) {
  const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    avatar ? defaultAvatar : defaultImage
  );
  const [userId, setUserId] = React.useState(null);
  const fileInput = React.useRef(null);
  const history = useHistory();

  React.useEffect(() => {
    auth.getUser().then((user) => {
      setUserId(user.id);
      console.log(user);
    });
  }, []);
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      handleSubmit(userId, file);
    };

    reader.readAsDataURL(file);
  };
  const handleSubmit = (id, file) => {
    let Formdata = new FormData();
    Formdata.append("user_id", id);
    Formdata.append("images", file);
    fetch(UPLOAD_USER_PICTURE + id, {
      mode: "no-cors",
      method: "POST",
      body: Formdata,
    }).then(
      function (res) {
        if (res.ok) {
          toast.success("Photo uploaded successfully");
          history.push("/profile");
        } else if (res.status == 401) {
          toast.error("Error while uploading");
        }
      },
      function (e) {
        toast.error("Error submitting form!");
      }
    );
  };
  const handleClick = () => {
    fileInput.current.click();
  };
  const handleRemove = () => {
    setFile(null);
    setImagePreviewUrl(avatar ? defaultAvatar : defaultImage);
    fileInput.current.value = null;
  };
  return (
    <div className="fileinput text-center">
      <input type="file" onChange={handleImageChange} ref={fileInput} />

      <div>
        <Button
          className={addBtnClasses}
          onClick={() => handleClick()}
          onSubmit={handleSubmit}
        >
          Add Photo
        </Button>
      </div>
    </div>
  );
}

ImageUpload.defaultProps = {
  avatar: false,
  removeBtnClasses: "btn-round",
  removeBtnColor: "danger",
  addBtnClasses: "btn-round",
  addBtnColor: "primary",
  changeBtnClasses: "btn-round",
  changeBtnColor: "primary",
};

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  removeBtnClasses: PropTypes.string,
  removeBtnColor: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "link",
  ]),
  addBtnClasses: PropTypes.string,
  addBtnColor: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "link",
  ]),
  changeBtnClasses: PropTypes.string,
  changeBtnColor: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "link",
  ]),
};
