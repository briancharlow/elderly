import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./popup.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/home");
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:5000/logout", {
        withCredentials: true,
      });
      console.log(response);
      if (response.data === "Logged out successfully") {
        navigate("/login");
      } else {
        // Handle logout failure
        alert("logout failed");
        console.error("Logout Failed");
      }
    } catch (error) {
      console.error("Error while logging out:", error.message);
    }
  };

  return (
    <div className="logout-popup">
      <div className="logout-content">
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to log out?</p>
        <div className="buttons">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
