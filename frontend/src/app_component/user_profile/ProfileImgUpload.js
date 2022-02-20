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

import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";
import { UPLOAD_PROFILE_PICTURE } from "constants/api";
import auth from "app_component/authentication/auth";

export default function ProfileImageUpload(
  avatar,
  addBtnColor,
  addBtnClasses,
  changeBtnColor,
  changeBtnClasses,
  removeBtnColor,
  removeBtnClasses
) {
  const [file, setFile] = React.useState(null);
  const [userId, setUserId] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(null);

  React.useEffect(() => {
    auth.getUser().then((user) => {
      setUserId(user.id);
      if (user.pictureName == null) {
        setImagePreviewUrl("no_image.jpg");
      } else {
        setImagePreviewUrl("uploaded_pictures/" + user.pictureName);
      }
    });
  }, []);
  const fileInput = React.useRef(null);
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
      handleSubmit(userId, file);
    };

    reader.readAsDataURL(file);
  };
  const handleSubmit = (id, file) => {
    let Formdata = new FormData();
    Formdata.append("image", file);
    fetch(UPLOAD_PROFILE_PICTURE + id, {
      mode: "no-cors",
      method: "POST",
      body: Formdata,
    }).then(
      function (res) {
        if (res.ok) {
          alert("profile picture uploaded successfuly ");
        } else if (res.status == 401) {
          alert("error ");
        }
      },
      function (e) {
        alert("Error submitting form!");
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
      <div
        className={
          "thumbnail" +
          (avatar ? " img-circle" : "img-center img-fluid rounded-circle")
        }
      >
        <img src={imagePreviewUrl} alt="..." />
      </div>
      <div>
        {file === null ? (
          <Button
            color={addBtnColor}
            className={addBtnClasses}
            onClick={() => handleClick()}
            onSubmit={handleSubmit}
          >
            {avatar ? "Add Photo" : "Select image"}
          </Button>
        ) : (
          <span>
            <Button
              color={changeBtnColor}
              className={changeBtnClasses}
              onClick={() => handleClick()}
            >
              Change
            </Button>
            {avatar ? <br /> : null}
            <Button
              color={removeBtnColor}
              className={removeBtnClasses}
              onClick={() => handleRemove()}
            >
              <i className="fa fa-times" /> Remove
            </Button>
          </span>
        )}
      </div>
    </div>
  );
}

ProfileImageUpload.defaultProps = {
  avatar: false,
  removeBtnClasses: "btn-round",
  removeBtnColor: "danger",
  addBtnClasses: "btn-round",
  addBtnColor: "primary",
  changeBtnClasses: "btn-round",
  changeBtnColor: "primary",
};

ProfileImageUpload.propTypes = {
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
