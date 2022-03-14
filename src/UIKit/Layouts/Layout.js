import React from "react";

import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <div className={classes.app} data-theme={`${false ? "light" : "dark"}`}>
      <div id="backdrop-root"></div>
      <div id="overlay-root"></div>
      <div id="snackbar-root"></div>
      <div id="prompt-root"></div>
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
