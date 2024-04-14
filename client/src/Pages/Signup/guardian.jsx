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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/register", formData);
      console.log(response.data);
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
          <FontAwesomeIcon icon={faUserCircle} className="form-icon" />
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            placeholder="Full Name"
            required
          />
          <div className="input-guide">
            Please enter your full name as it appears on your official
            documents.
          </div>
        </div>
        <div className="form-group">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="form-icon" />
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Location"
            required
          />
          <div className="input-guide">
            Please enter the city and country where you currently reside.
          </div>
        </div>
        <div className="form-group">
          <FontAwesomeIcon icon={faLock} className="form-icon" />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          <div className="input-guide">
            Your password must be at least 8 characters long and include at
            least one uppercase letter, one lowercase letter, and one number.
          </div>
        </div>
        <div className="form-group">
          <FontAwesomeIcon icon={faEnvelope} className="form-icon" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <div className="input-guide">
            Please enter a valid email address that you have access to.
          </div>
        </div>
        <div className="form-group">
          <FontAwesomeIcon icon={faPhoneAlt} className="form-icon" />
          <input
            type="tel"
            id="emergency_contact"
            name="emergency_contact"
            value={formData.emergency_contact}
            onChange={handleInputChange}
            placeholder="Emergency Contact"
            required
          />
          <div className="input-guide">
            Please enter a phone number where you can be reached in case of an
            emergency.
          </div>
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
