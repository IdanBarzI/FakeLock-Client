import {
  onFocusOut as fieldOnFocusOut,
  UPDATE_FORM as UPDATE_FORM_GENERY,
  validateEmail,
} from "./form";

const UPDATE_FORM = UPDATE_FORM_GENERY;
const RESET_FORM = "RESET_FORM";

export const onFocusOut = (name, value, dispatch, formState) => {
  fieldOnFocusOut(name, value, dispatch, formState, validateInput);
};

export const initialState = {
  email: { value: "", touched: false, hasError: false, error: "" },
  password: { value: "", touched: false, hasError: false, error: "" },
  isFormValid: true,
};

export const formsReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, touched, hasError, error, isFormValid } =
        action.data;
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
export const validateInput = (name, value) => {
  let hasError = false,
    error = "";
  switch (name) {
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
      if (value.trim() === "") {
        hasError = true;
        error = "Password cannot be empty";
      } else if (value.trim().length < 6) {
        hasError = true;
        error = "Password must have at least 6 characters";
      } else if (value.trim().length > 150) {
        hasError = true;
        error = "Password can't have more then 150 characters";
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
