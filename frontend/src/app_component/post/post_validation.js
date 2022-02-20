const validation = (values) => {
  let errors = {};

  if (!values.title) {
    errors.title = " title is required";
  }

  if (!values.description) {
    errors.description = "description is required";
  }

  return errors;
};
export default validation;
