export const UPDATE_FORM = "UPDATE_FORM";

export const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const onFocusOut = (name, value, dispatch, formState, validateInput) => {
  const { hasError, error } = validateInput(name, value, formState);
  let isFormValid = true;
  for (const key in formState) {
    const item = formState[key];
    if (key === name && hasError) {
      isFormValid = false;
      break;
    } else if (key !== name && item.hasError) {
      isFormValid = false;
      break;
    }
  }

  dispatch({
    type: UPDATE_FORM,
    data: { name, value, hasError, error, touched: true, isFormValid },
  });
};
