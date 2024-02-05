import React from "react";
import UserProfile from "./UserProfile";
import Suggested from "./Suggested";
import "./rightbar.css"; // Import the CSS file for styling

const RightBar = () => {
  return (
    <div className="rightbar">
      <UserProfile />
      <Suggested />
    </div>
  );
};

export default RightBar;
