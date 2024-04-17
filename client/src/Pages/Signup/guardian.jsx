// SignUpForm.jsx

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faMapMarkerAlt,
  faLock,
  faEnvelope,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./guardian.css"; // Import the CSS stylesheet
import { useNavigate } from "react-router-dom";

const Guardian = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    location: "",
    password: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      );
      if (response.data.success) {
        alert("User registered successfully!");
        alert("Please login with your new credentials to continue");
        navigate("/login");
        // You can redirect the user to another page or take appropriate action upon successful registration
      } else {
        alert("User registration failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Internal Server Error. Please try again later.");
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faUserCircle} /> Full Name
          </label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faLock} /> Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faPhoneAlt} /> Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Guardian;
