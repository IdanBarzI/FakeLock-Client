import React, { useState } from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import { Card } from "../..//UIKit";
import { Form, Details } from "../../Components/Login/Login";
import {
  Form as SignUpForm,
  Details as SignUpDerails,
} from "../../Components/SignUp/SignUp";
import classes from "./Welcome.module.css";

const Welcome = () => {
  const [toggleSign, setToggleSign] = useState(true);

  const handleToggleSign = () => {
    setToggleSign((curState) => !curState);
  };

  return (
    <Card className={classes.continer}>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={toggleSign}
        timeout={1000}
        classNames={{
          enterActive: classes.enterLeftD,
          exitActive: classes.exitLeftD,
        }}
      >
        <Details handleToggleSign={handleToggleSign} />
      </CSSTransition>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={toggleSign}
        timeout={1000}
        classNames={{
          enterActive: classes.enterRight,
          exitActive: classes.exitRight,
        }}
      >
        <Form />
      </CSSTransition>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={!toggleSign}
        timeout={1000}
        classNames={{
          enter: classes.enterLeft,
          exit: classes.exitLeft,
        }}
      >
        <SignUpForm />
      </CSSTransition>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={!toggleSign}
        timeout={1000}
        classNames={{
          enter: classes.enterRightD,
          exit: classes.exitRightD,
        }}
      >
        <SignUpDerails handleToggleSign={handleToggleSign} />
      </CSSTransition>
    </Card>
  );
};

export default Welcome;
