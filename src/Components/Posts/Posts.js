import React, { useState, useRef } from "react";

import NewPost from "./NewPost/NewPost";
import { Typography, Button, Snackbar, Prompt, Shimmer } from "../../UIKit";
import Timeline from "./Timeline/Timeline";

export const Posts = () => {
  const snackbarRef = useRef(null);
  const promptRef = useRef(null);

  const [openNewPost, setNewPost] = useState(false);
  const [promptOnConfirm, setPromptOnConfirm] = useState(() => {});

  const handleCloseNewPost = () => {
    setNewPost(false);
  };

  const handleOpenNewPost = () => {
    setNewPost(true);
  };

  const snackbarShow = (type, content) => {
    snackbarRef.current.show(type, content);
  };

  const promptShow = (title, content) => {
    promptRef.current.show(title, content);
  };

  return (
    <div>
      <Button onClick={() => handleOpenNewPost()}>New Post</Button>

      <NewPost
        show={openNewPost}
        onCancle={() => handleCloseNewPost()}
        snackbarShow={snackbarShow}
        promptShow={promptShow}
        setPromptOnConfirm={setPromptOnConfirm}
      />
      <Timeline/>
      <Snackbar ref={snackbarRef} />

      <Prompt
        ref={promptRef}
        confirm={() => promptOnConfirm()}
        cancle={() => {}}
      />
    </div>
  );
};
