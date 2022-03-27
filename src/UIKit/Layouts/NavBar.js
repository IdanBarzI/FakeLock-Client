import React, { Fragment, useContext } from "react";
import useFetch from "../../hooks/use-fetch";
import { NavLink } from "react-router-dom";
import { ToggleSwitch, HoverBox, Button } from "../../UIKit";
import SettingsContext from "../../context/SettingsContext";
import classes from "./NavBar.module.css";
import AppContext from "../../context/AppContext";

const NavBar = (props) => {
  const settingCtx = useContext(SettingsContext);
  const { user, token, logout } = useContext(AppContext);
  const { isLoading, error, sendRequest: sendLogoutRequest } = useFetch();

  const logoutHandler = async () => {
    await sendLogoutRequest(
      {
        url: `users/logout`,
        method: "POST",
      },
      (data) => {
        logout();
      }
    );
  };

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul>
          <li className={classes.settings}>
            <HoverBox i="fa fa-cog">
              <ToggleSwitch onChange={settingCtx.onThemeSwitch} />
              <div className={classes.btn}>
                <Button onClick={() => logoutHandler()} isLoading={isLoading}>
                  Logout
                </Button>
              </div>
            </HoverBox>
          </li>
          {token && (
            <Fragment>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to={`/profile/${user._id}`}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to="/friends"
                >
                  Friends
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to="/posts"
                >
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to="/map"
                >
                  Map
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to="/new-post"
                >
                  New Post
                </NavLink>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
