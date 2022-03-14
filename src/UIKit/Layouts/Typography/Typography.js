import React from "react";
import classes from "./Typography.module.css";

const Typography = (props) => {
  const typographyClasses = `${classes.typography + " " + props.className}`;
  return <p className={typographyClasses}>{props.children}</p>;
};

export default Typography;
