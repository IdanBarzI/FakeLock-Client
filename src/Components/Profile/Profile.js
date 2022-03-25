import React, { useContext, useEffect, useState, useRef } from "react";
import AppContext from "../../context/AppContext";
import DropZone from "./DropZone/DropZone";
import { Typography, Button, Snackbar, Prompt, Shimmer } from "../../UIKit";
import useAxios from "../../hooks/use-axios";
import classes from "./Profile.module.css";

export const Profile = () => {
  const { user } = useContext(AppContext);
  const snackbarRef = useRef(null);
  const promptRef = useRef(null);
  const [src, setSrc] = useState(null);
  const [openNewAvatar, setOpenNewAvatar] = useState(false);
  const [promptOnConfirm, setPromptOnConfirm] = useState(() => {});
  const {
    isLoading,
    fetchError,
    sendRequest: sendGetAvatarRequest,
  } = useAxios();

  const getAvatarHandler = async () => {
    await sendGetAvatarRequest(
      {
        baseUrl: `http://localhost:5001`,
        url: `users/avatar`,
      },
      (data) => {
        setSrc(data);
      }
    );
  };

  useEffect(() => {
    getAvatarHandler();
  }, []);

  const snackbarShow = (type, content) => {
    snackbarRef.current.show(type, content);
  };

  const promptShow = (title, content) => {
    promptRef.current.show(title, content);
  };

  const closeDropZone = () => {
    setOpenNewAvatar(false);
    getAvatarHandler();
  };

  const handleOpenDropZone = () => {
    setOpenNewAvatar(true);
  };

  return (
    <div className={classes.userCard}>
      <figure className={classes.userPic}>
        {isLoading ? (
          <div className={classes.imgLoading}>
            <Shimmer />
          </div>
        ) : (
          <img
            src={`data:image/png;base64,${src}`}
            height="200"
            width="200"
            style={{
              borderRadius: "5px",
              border: "5px solid green",
            }}
          />
        )}
        <div className={classes.btnLoading}>
          {isLoading ? (
            <Shimmer />
          ) : (
            <Button onClick={() => handleOpenDropZone()}>
              Change Profile Picture
            </Button>
          )}
        </div>
      </figure>
      <div className={classes.userDetails}>
        <Typography className={classes.userName}>{user.userName}</Typography>
        <Typography className={classes.email}>{user.email}</Typography>
      </div>
      {src && (
        <DropZone
          src={src}
          show={openNewAvatar}
          onCancle={() => closeDropZone()}
          snackbarShow={snackbarShow}
          promptShow={promptShow}
          setPromptOnConfirm={setPromptOnConfirm}
        />
      )}

      <Snackbar ref={snackbarRef} />

      <Prompt
        ref={promptRef}
        confirm={() => promptOnConfirm()}
        cancle={() => {}}
      />
    </div>
  );
};
