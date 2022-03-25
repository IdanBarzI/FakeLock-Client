import React, { useState, useReducer, useContext } from "react";
import useFetch from "../../hooks/use-fetch";
import AppContext from "../../context/AppContext";
import {
  initialState,
  formsReducer,
  onFocusOut,
} from "../../reducer/loginForm";
import { Typography, Input, Line, Icon, Button } from "../../UIKit";
import Facebook from "./Facebook/Facebook";
import classes from "./Login.module.css";

export const Form = () => {
  console.log(process.env.FACEBOOK_LOGIN_KEY);
  const [formState, dispatch] = useReducer(formsReducer, initialState);
  const { login } = useContext(AppContext);
  const { isLoading, error, sendRequest: sendLoginRequest } = useFetch();

  const loginHandler = async () => {
    if (formState.isFormValid) {
      await sendLoginRequest(
        {
          url: `users/login`,
          method: "POST",
          body: {
            email: formState.email.value,
            password: formState.password.value,
          },
        },
        (data) => {
          login(data.user, data.token);
        }
      );
    }
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    loginHandler();
  };

  return (
    <form className={classes.form} onSubmit={formSubmissionHandler}>
      <h2 className={classes.header}>Login</h2>
      <div className={classes.header}></div>
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
          }}
          type="password"
        />
      </div>
      <Line justify="center">
        <div className={classes.fCon}>
          <div className={classes.icon}>
            <Icon i="fab fa-google" />
          </div>
        </div>
        <div className={classes.icon}>
          <div className={classes.fCon}>
            <Icon i="fab fa-facebook-f" />
            <Facebook />
          </div>
        </div>
      </Line>
      <Typography>Forgot Your Password?</Typography>

      <Button isLoading={isLoading} type="submit" className={classes.btn}>
        Login
      </Button>
      {error && <p className="errorMsg">{error}</p>}
    </form>
  );
};

export const Details = (props) => {
  return (
    <div className={classes.details}>
      <h2 className={classes.header}>Welcome, Friend</h2>
      <Typography>Enter Yout Details And Start Your Journey With Us</Typography>

      <Typography>
        Dont have a user yet?{" "}
        <a className={classes.back} onClick={() => props.handleToggleSign()}>
          SignUp
        </a>
      </Typography>
    </div>
  );
};
