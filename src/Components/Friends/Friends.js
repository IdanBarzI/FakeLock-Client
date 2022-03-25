import React from "react";
import FriendZone from "./FriendZone/FriendZone";
import GroupZone from "./GroupZone/GroupZone";
import classes from "./Friends.module.css";

const Friends = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.friendZone}>
        <FriendZone />
      </div>
      <div className={classes.groupZone}>
        <GroupZone />
      </div>
    </div>
  );
};

export default Friends;
