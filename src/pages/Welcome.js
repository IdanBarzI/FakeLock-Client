import React, { useState } from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import { Card } from "../UIKit";
import { Form, Details } from "../Components/Login/Login";
import {
  Form as SignUpForm,
  Details as SignUpDerails,
} from "../Components/SignUp/SignUp";
import classes from "./Login.module.css";

const animationTiming = {
  enter: 1000,
  exit: 1000,
};

const Welcome = () => {
  const [toggleSign, setToggleSign] = useState(true);

  const handleToggleSign = () => {
    setToggleSign((curState) => !curState);
  };

  return (
    <Card className={classes.continer}>
      <div>
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={toggleSign}
          timeout={animationTiming}
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
          timeout={animationTiming}
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
          timeout={animationTiming}
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
          timeout={animationTiming}
          classNames={{
            enter: classes.enterRightD,
            exit: classes.exitRightD,
          }}
        >
          <SignUpDerails handleToggleSign={handleToggleSign} />
        </CSSTransition>
      </div>
    </Card>
  );
};

export default Welcome;
