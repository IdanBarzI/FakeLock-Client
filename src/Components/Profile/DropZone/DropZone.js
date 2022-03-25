import React, { useState, useRef, useEffect } from "react";
import useAxios from "../../../hooks/use-axios";
import { Modal, Icon, Typography, Button } from "../../../UIKit";
import classes from "./DropZone.module.css";

const DropZone = (props) => {
  const [selectedFile, setSelectedFile] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [src, setSrc] = useState(`data:image/png;base64,${props.src}`);
  const {
    isLoading,
    fetchError,
    sendRequest: sendUpdateAvatarRequest,
  } = useAxios();

  const updateAvatarHandler = async () => {
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    console.log(formData);

    await sendUpdateAvatarRequest(
      {
        url: `users/avatar`,
        method: "post",
        data: formData,
      },
      (data) => {
        props.snackbarShow("Profile Updated", "success");
        props.onCancle();
      }
    );
  };

  const handleSaveClick = () => {
    if (!selectedFile.invalid) {
      props.promptShow(
        "Are you sure you want to save?",
        "The picture from before will be deleted"
      );
      props.setPromptOnConfirm(() => updateAvatarHandler);
    }
  };

  const handleFile = (file) => {
    if (validateFile(file)) {
      if (file.size >= 1000000) {
        file.invalid = true;
        setErrorMessage("File size to big");
      }
      setSelectedFile(file);
    } else {
      file.invalid = true;
      setSelectedFile(file);
      setErrorMessage("File type not permitted");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      setSrc(`${e.target.result}`);
    };
  };
  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const validateFile = (file) => {
    const validTypes = ["image/jpg", "image/png"];
    let isvalid = false;
    validTypes.forEach((validType) => {
      if (file.type === validType) {
        isvalid = true;
        return;
      }
    });
    return isvalid;
  };

  const fileSize = (size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const fileType = (fileName) => {
    return (
      fileName?.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
      fileName
    );
  };
  return (
    <Modal
      show={props.show}
      onCancle={props.onCancle}
      title="Drag and Drop Picture"
      scroll={false}
    >
      <div className={classes.container}>
        <div
          className={classes.dropContainer}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
        >
          <img
            src={src}
            height="200"
            width="200"
            style={{
              borderRadius: "5px",
              border: `5px solid ${selectedFile.invalid ? "red" : "green"}`,
            }}
          />
        </div>
        <div className={classes.fileDisplayContainer}>
          <div className={classes.fileStatusBar}>
            <div className={classes.fileTypeLogo}></div>
            <Typography className={classes.fileType}>
              {selectedFile.name && `Type: ${fileType(selectedFile.name)}`}
            </Typography>
            <Typography
              className={`${classes.fileName} ${
                selectedFile.invalid ? classes.fileError : ""
              }`}
            >
              {selectedFile.name && `Name: ${selectedFile.name}`}
            </Typography>
            <Typography className={classes.fileSize}>
              {selectedFile.size && `Size: (${fileSize(selectedFile.size)})`}
            </Typography>
            {selectedFile.invalid && (
              <Typography className="errorMsg">
                Error: ({errorMessage})
              </Typography>
            )}
          </div>
        </div>
      </div>
      <Button isLoading={isLoading} onClick={() => handleSaveClick()}>
        Save Picture
      </Button>
      {fetchError}
    </Modal>
  );
};
export default DropZone;
