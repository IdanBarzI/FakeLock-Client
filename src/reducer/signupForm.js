import {
  onFocusOut as fieldOnFocusOut,
  UPDATE_FORM as UPDATE_FORM_GENERY,
  validateEmail,
} from "./form";

export const UPDATE_FORM = UPDATE_FORM_GENERY;
export const RESET_FORM = "RESET_FORM";

export const onFocusOut = (name, value, dispatch, formState) => {
  fieldOnFocusOut(name, value, dispatch, formState, validateInput);
};

export const onChange = (name, value, dispatch, formState) => {
  fieldOnFocusOut(name, value, dispatch, formState, validateInput);
};

export const initialState = {
  userName: { value: "", touched: false, hasError: false, error: "" },
  email: { value: "", touched: false, hasError: false, error: "" },
  password: { value: "", touched: false, hasError: false, error: "" },
  confirmPassword: { value: "", touched: false, hasError: false, error: "" },
  isFormValid: true,
};

export const formsReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, touched, hasError, error, isFormValid } =
        action.data;
      console.log("update", name);
      return {
        ...state,
        [name]: { ...state[name], touched, value, hasError, error },
        isFormValid,
      };
    case RESET_FORM:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export const validateInput = (name, value, formState) => {
  let hasError = false,
    error = "";
  switch (name) {
    case "userName":
      if (value.trim() === "") {
        hasError = true;
        error = "User Name cannot be empty";
      } else {
        hasError = false;
        error = "";
      }
      break;

    case "email":
      if (value.trim() === "") {
        hasError = true;
        error = "Email cannot be empty";
      } else if (!validateEmail(value)) {
        hasError = true;
        error = "Email is Invalid";
      } else {
        hasError = false;
        error = "";
      }
      break;

    case "password":
      // console.log(value);
      if (value.trim() === "") {
        hasError = true;
        error = "Password cannot be empty";
      } else if (value.trim().length < 6) {
        hasError = true;
        error = "Password must have at least 6 characters";
      } else if (value.trim().length > 150) {
        hasError = true;
        error = "Password can't have more then 150 characters";
      } else if (
        value.trim().toUpperCase() !==
        formState.confirmPassword.value.trim().toUpperCase()
      ) {
        console.log("value", value);
        console.log(
          "formState.confirmPassword.value",
          formState.confirmPassword.value
        );
        hasError = true;
        error = "Password have to be the same as Confirm Password";
      } else {
        hasError = false;
        error = "";
      }
      break;

    case "confirmPassword":
      if (value.trim() === "") {
        hasError = true;
        error = "Confirm Password cannot be empty";
      } else if (value.trim().length < 6) {
        hasError = true;
        error = "Confirm Password must have at least 6 characters";
      } else if (value.trim().length > 150) {
        hasError = true;
        error = "Confirm Password can't have more then 150 characters";
      } else if (
        value.trim().toUpperCase() !==
        formState.password.value.trim().toUpperCase()
      ) {
        console.log("value", value);
        console.log("formState.password.value", formState.password.value);
        hasError = true;
        error = "Confirm Password have to be the same as Password";
      } else {
        hasError = false;
        error = "";
      }
      break;
    default:
      break;
  }
  return { hasError, error };
};
