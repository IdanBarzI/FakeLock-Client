import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useStickyState from "../hooks/use-sticky-state";
import { SettingsContextProvider } from "./SettingsContext";

let logoutTimer;
const defultExpirationTime = 3600000;

const AppContext = React.createContext({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  login: () => {},
  logout: () => {},
});

export const AppContextProvider = (props) => {
  const [user, setUser] = useStickyState(null, "user");
  const [token, setToken] = useStickyState(null, "token");
  const navigate = useNavigate();

  const logout = useCallback(() => {
    navigate("/", { replace: true });
    console.log("logout");
    setUser(null);
    localStorage.removeItem("user");
    setToken(null);
    localStorage.removeItem("token");
  }, []);

  const login = (user, token) => {
    setUser(user);
    setToken(token);
    navigate("/profile", { replace: true });
    inactivityTime();
  };

  var inactivityTime = function () {
    // console.log("inactivityTime");
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;

    function resetTimer() {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(logout, defultExpirationTime);
    }
  };

  return (
    <SettingsContextProvider>
      <AppContext.Provider
        value={{
          user,
          setUser: setUser,
          token,
          setToken: setToken,
          login: login,
          logout: logout,
        }}
      >
        {props.children}
      </AppContext.Provider>
    </SettingsContextProvider>
  );
};

export default AppContext;
