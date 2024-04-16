import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faMapMarkerAlt,
  faLock,
  faEnvelope,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./guardian.css";

const Guardian = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    location: "",
    password: "",
    email: "",
    emergency_contact: "",
  });

  const [errors, setErrors] = useState({});
  const [activeInput, setActiveInput] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInputFocus = (e) => {
    setActiveInput(e.target.name);
  };

  const handleInputBlur = () => {
    setActiveInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("foo");
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      );
      console.log("bar");
      console.log(response.data);
      if (response.data.success) {
        alert(
          "Registration successful. Please login with your new credentials to access the system."
        );
        navigate("/login");
      } else {
        alert("Registration failed. Please try again.");
      }
      // Handle successful registration
    } catch (error) {
      console.error(error);
      setErrors({ general: "Registration failed. Please try again." });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h1>Join Us</h1>
        <p>Create your account and start your journey with us.</p>
      </div>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <div className="input-group">
            <FontAwesomeIcon icon={faUserCircle} className="form-icon" />
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Full Name"
              required
            />
          </div>
          {activeInput === "fullname" && (
            <div className="input-guide">
              Please enter your full name as it appears on your official
              documents.
            </div>
          )}
        </div>
        <div className="form-group">
          <div className="input-group">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="form-icon" />
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Location"
              required
            />
          </div>
          {activeInput === "location" && (
            <div className="input-guide">
              Please enter the city and country where you currently reside.
            </div>
          )}
        </div>
        <div className="form-group">
          <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="form-icon" />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Password"
              required
            />
          </div>
          {activeInput === "password" && (
            <div className="input-guide">
              Your password must be at least 8 characters long and include at
              least one uppercase letter, one lowercase letter, one special
              character (eg @,#), and one number.
            </div>
          )}
        </div>
        <div className="form-group">
          <div className="input-group">
            <FontAwesomeIcon icon={faEnvelope} className="form-icon" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Email"
              required
            />
          </div>
          {activeInput === "email" && (
            <div className="input-guide">
              Please enter a valid email address that you have access to.
            </div>
          )}
        </div>
        <div className="form-group">
          <div className="input-group">
            <FontAwesomeIcon icon={faPhoneAlt} className="form-icon" />
            <input
              type="tel"
              id="emergency_contact"
              name="emergency_contact"
              value={formData.emergency_contact}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Emergency Contact"
              required
            />
          </div>
          {activeInput === "emergency_contact" && (
            <div className="input-guide">
              Please enter a phone number where you can be reached in case of an
              emergency.
            </div>
          )}
        </div>
        {errors.general && (
          <div className="error-message">{errors.general}</div>
        )}
        <button type="submit" className="submit-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Guardian;
