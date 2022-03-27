import React from "react";
import classes from "./TextArea.module.css";

const TextArea = (props) => {
  return (
    <div>
      <textarea
        className={classes.textarea}
        placeholder={props.placeHolder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        required={!props.notRequired}
      ></textarea>
      {props.touched && props.hasError && (
        <p className="error-msg">{props.errorMsg}</p>
      )}
    </div>
  );
};

export default TextArea;
