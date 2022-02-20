const validation = (values) => {
  let errors = {};

  if (!values.username) {
    errors.username = "username is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required . ";
  } else if (values.password.length < 5) {
    errors.password = "Password is too short";
  }
  return errors;
};
export default validation;
