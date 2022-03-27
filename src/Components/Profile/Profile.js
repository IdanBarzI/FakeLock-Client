import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/use-axios";

import AppContext from "../../context/AppContext";
import DropZone from "./DropZone/DropZone";
import { Typography, Button, Snackbar, Prompt, Shimmer } from "../../UIKit";

import classes from "./Profile.module.css";

export const Profile = () => {
  const params = useParams();
  const { user, setUser } = useContext(AppContext);
  const snackbarRef = useRef(null);
  const promptRef = useRef(null);
  const [src, setSrc] = useState(user.avatar);
  const [userProfile, setUserProfile] = useState(false);
  const [openNewAvatar, setOpenNewAvatar] = useState(false);
  const [promptOnConfirm, setPromptOnConfirm] = useState(() => {});
  const {
    isLoadingg,
    fetchErrorr,
    sendRequest: sendGetAvatarRequest,
  } = useAxios();
  const { isLoading, fetchError, sendRequest: sendGetUserRequest } = useAxios();

  const getAvatarHandler = async () => {
    await sendGetAvatarRequest(
      {
        url: `users/${user._id}/avatar`,
      },
      (data) => {
        setSrc(data);
        setUser({ ...user, avatar: data });
      }
    );
  };

  const getUserHandler = async () => {
    await sendGetUserRequest(
      {
        url: `users/${params.id}`,
      },
      (data) => {
        console.log(data);
        setSrc(data.avatar);
        setUserProfile(data);
      }
    );
  };

  useEffect(() => {
    if (user._id === params.id) {
      setUserProfile(user);
    } else {
      getUserHandler();
    }
  }, [snackbarRef]);

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
            user._id === userProfile._id && (
              <Button onClick={() => handleOpenDropZone()}>
                Change Profile Picture
              </Button>
            )
          )}
        </div>
      </figure>
      <div className={classes.userDetails}>
        <Typography className={classes.userName}>
          {userProfile.userName}
        </Typography>
        <Typography className={classes.email}>{userProfile.email}</Typography>
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
