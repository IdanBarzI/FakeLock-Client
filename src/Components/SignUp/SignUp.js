import React, { useReducer, useContext } from "react";
import useFetch from "../../hooks/use-fetch";
import AppContext from "../../context/AppContext";
import {
  initialState,
  formsReducer,
  onFocusOut,
} from "../../reducer/signupForm";
import { Typography, Input, Button } from "../../UIKit";
import classes from "./SignUp.module.css";

export const Form = () => {
  const [formState, dispatch] = useReducer(formsReducer, initialState);
  const { login } = useContext(AppContext);
  const { isLoading, error, sendRequest: sendSignupRequest } = useFetch();

  const signupHandler = async () => {
    if (formState.isFormValid) {
      await sendSignupRequest(
        {
          url: `users`,
          method: "POST",
          body: {
            userName: formState.userName.value,
            email: formState.email.value,
            password: formState.password.value,
          },
        },
        (data) => {
          console.log(data);
          login(data.user, data.token);
        }
      );
    }
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    signupHandler();
  };

  return (
    <form className={classes.form} onSubmit={formSubmissionHandler}>
      <h2 className={classes.header}>Signup</h2>

      <div className={classes.input}>
        <Input
          name="User Name"
          i="fa fa-user"
          hasError={formState.userName.hasError}
          errorMsg={formState.userName.error}
          touched={formState.userName.touched}
          onBlur={(e) => {
            onFocusOut("userName", e.target.value, dispatch, formState);
          }}
        />
      </div>
      <div className={classes.input}>
        <Input
          name="Email"
          i="fa fa-envelope"
          hasError={formState.email.hasError}
          errorMsg={formState.email.error}
          touched={formState.email.touched}
          onBlur={(e) => {
            onFocusOut("email", e.target.value, dispatch, formState);
          }}
        />
      </div>
      <div className={classes.input}>
        <Input
          name="Password"
          i="fa fa-lock"
          hasError={formState.password.hasError}
          errorMsg={formState.password.error}
          touched={formState.password.touched}
          onBlur={(e) => {
            onFocusOut("password", e.target.value, dispatch, formState);
            onFocusOut(
              "confirmPassword",
              formState.confirmPassword.value,
              dispatch,
              formState
            );
          }}
          type="password"
        />
      </div>
      <div className={classes.input}>
        <Input
          name="Confirm Password"
          i="fa fa-lock"
          hasError={formState.confirmPassword.hasError}
          errorMsg={formState.confirmPassword.error}
          touched={formState.confirmPassword.touched}
          onBlur={(e) => {
            onFocusOut("confirmPassword", e.target.value, dispatch, formState);
            onFocusOut(
              "password",
              formState.password.value,
              dispatch,
              formState
            );
          }}
          type="password"
        />
      </div>
      <Button isLoading={isLoading} type="submit" className={classes.btn}>
        Signup
      </Button>
      {error && <p className="errorMsg">{error}</p>}
    </form>
  );
};

export const Details = (props) => {
  return (
    <div className={classes.details}>
      <h2 className={classes.header}>Welcome, Friend</h2>
      <Typography>
        To keep connected with us please login with your personal info
      </Typography>
      <Typography>
        Allready have a user?{" "}
        <a className={classes.back} onClick={() => props.handleToggleSign()}>
          Login
        </a>
      </Typography>
    </div>
  );
};
