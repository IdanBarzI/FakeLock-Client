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
  description: { value: "", touched: false, hasError: false, error: "" },
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
    case "description":
      if (value.trim() === "") {
        hasError = true;
        error = "Description cannot be empty";
      } else if (value.length > 200) {
        hasError = true;
        error = "Description cannot be longer then 200 characters";
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
