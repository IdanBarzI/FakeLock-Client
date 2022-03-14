import React from "react";
import { Typography, Input, Line, Icon, Button } from "../../UIKit";
import classes from "./SignUp.module.css";

export const Form = () => {
  return (
    <div className={classes.form}>
      <h2 className={classes.header}>SignUp</h2>

      <div className={classes.input}>
        <Input name="User Name" />
      </div>
      <div className={classes.input}>
        <Input name="Password" />
      </div>
      <div className={classes.input}>
        <Input name="Confirm Password" />
      </div>
      <Button className={classes.btn}>SignUp</Button>
    </div>
  );
};

export const Details = (props) => {
  return (
    <div className={classes.details}>
      <h2 className={classes.header}>Welcome, Friend</h2>
      <Typography>
        To keep connected with us please login with your personal info
      </Typography>
      <Button className={classes.btn} onClick={() => props.handleToggleSign()}>
        Back To Login
      </Button>
    </div>
  );
};
