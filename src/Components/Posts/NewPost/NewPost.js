import React, { useState, useReducer, useContext } from "react";
import useAxios from "../../../hooks/use-axios";
import AppContext from "../../../context/AppContext";
import {
  initialState,
  formsReducer,
  onFocusOut,
} from "../../../reducer/postForm";
import DropZone from "./DropZone/DropZone";
import { Modal, Icon, Typography, Button, TextArea } from "../../../UIKit";
import classes from "./NewPost.module.css";

const NewPost = (props) => {
  const { user } = useContext(AppContext);
  const [formState, dispatch] = useReducer(formsReducer, initialState);
  const [selectedFile, setSelectedFile] = useState({});

  const {
    isLoading,
    fetchError,
    sendRequest: sendCreatePostRequest,
  } = useAxios();

  const updateAvatarHandler = async () => {
    if (!selectedFile.invalid && formState.isFormValid) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("description", formState.description.value);
      try {
        await sendCreatePostRequest(
          {
            url: `posts`,
            method: "post",
            data: formData,
          },
          (data) => {
            console.log("data");
          }
        );
        props.snackbarShow("Post Added", "success");
        props.onCancle();
      } catch (e) {
        props.snackbarShow("Error", "fail");
      }
    }
  };

  return (
    <Modal
      show={props.show}
      onCancle={props.onCancle}
      title="Create New Post"
      scroll={false}
    >
      <div>
        <TextArea
          placeHolder={`${user.userName} What do you want to share?`}
          hasError={formState.description.hasError}
          errorMsg={formState.description.error}
          touched={formState.description.touched}
          onBlur={(e) => {
            onFocusOut("description", e.target.value, dispatch, formState);
          }}
        />

        <DropZone
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />

        <Button onClick={() => updateAvatarHandler()} isLoading={isLoading}>
          Publish
        </Button>
      </div>
    </Modal>
  );
};

export default NewPost;
