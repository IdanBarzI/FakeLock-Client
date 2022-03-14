import React from "react";
import { Typography, Input, Line, Icon, Button } from "../../UIKit";
import classes from "./Login.module.css";

export const Form = () => {
  return (
    <div className={classes.form}>
      <h2 className={classes.header}>Login</h2>
      <div className={classes.header}>
        <Line justify="center">
          <Typography className={classes.icon}>
            <Icon i="google" />
          </Typography>
          <Typography className={classes.icon}>
            <Icon i="facebook-f" />
          </Typography>
        </Line>
      </div>
      <div className={classes.input}>
        <Input name="User Name" />
      </div>
      <div className={classes.input}>
        <Input name="Password" />
      </div>
      <Typography>Forgot Your Password?</Typography>

      <Button className={classes.btn}>Login</Button>
    </div>
  );
};

export const Details = (props) => {
  return (
    <div className={classes.details}>
      <h2 className={classes.header}>Welcome, Friend</h2>
      <Typography>Enter Yout Details And Start Your Journey With Us</Typography>
      <Button
        className={`${classes.btn} ${classes.backBtn}`}
        onClick={() => props.handleToggleSign()}
      >
        Back To SignUp
      </Button>
    </div>
  );
};
