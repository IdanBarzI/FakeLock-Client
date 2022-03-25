import React, { useContext } from "react";
import useFetch from "../../../hooks/use-fetch";
import AppContext from "../../../context/AppContext";
import FacebookLogin from "react-facebook-login";
import classes from "./Facebook.module.css";

const Facebook = () => {
  const { login } = useContext(AppContext);
  const { isLoading, error, sendRequest: sendLoginRequest } = useFetch();
  const loginHandler = async (userName, email, password) => {
    await sendLoginRequest(
      {
        url: `users/login-facebook`,
        method: "POST",
        body: {
          userName,
          email,
          password,
        },
      },
      (data) => {
        login(data.user, data.token);
      }
    );
  };

  const responseFacebook = (response) => {
    loginHandler(response.name, response.email, response.id);
  };

  return (
    <>
      <FacebookLogin
        appId="1033704900576652"
        autoLoad={false}
        fields="name,email"
        cssClass={classes.facebook}
        callback={responseFacebook}
      />
    </>
  );
};

export default Facebook;
