import React, { useContext } from "react";
import NavBar from "./NavBar";
import SettingsContext from "../../context/SettingsContext";

import classes from "./Layout.module.css";

const Layout = (props) => {
  const ctx = useContext(SettingsContext);
  return (
    <div className={classes.app} data-theme={`${ctx.theme ? "light" : "dark"}`}>
      <div id="backdrop-root"></div>
      <div id="overlay-root"></div>
      <div id="snackbar-root"></div>
      <div id="prompt-root"></div>
      <NavBar />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
