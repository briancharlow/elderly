import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserNurse,
  faMapMarkerAlt,
  faLock,
  faEnvelope,
  faPhoneAlt,
  faMoneyBillAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./signup.css";

const CaregiverSignupForm = () => {
  const [formData, setFormData] = useState({
    certification_id: "",
    fullname: "",
    location: "",
    email: "",
    phone: "",
    password: "",
    fees: "",
  });

  const [errors, setErrors] = useState({});
  const [activeInput, setActiveInput] = useState("");

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
      const response = await axios.post(
        "http://localhost:5000/createcaregiver",
        formData
      );
      console.log(response.data);
      // Handle successful caregiver creation
    } catch (error) {
      console.error(error);
      setErrors({ general: error.response.data.message });
    }
  };

  return (
    <div className="caregiver-signup-container">
      <div className="caregiver-signup-header">
        <h1>Become a Caregiver</h1>
        <p>Join our network, make a difference.</p>
      </div>
      <form onSubmit={handleSubmit} className="caregiver-signup-form">
        <div className="form-group">
          <div className="input-group">
            <FontAwesomeIcon icon={faUserNurse} className="form-icon" />
            <input
              type="text"
              id="certification_id"
              name="certification_id"
              value={formData.certification_id}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Certification ID"
              required
            />
          </div>

          {activeInput === "certification_id" && (
            <div className="input-guide">
              Please enter the unique identifier number for your caregiver
              certification.
            </div>
          )}
        </div>
        <div className="form-group">
          <div className="input-group">
            <FontAwesomeIcon icon={faUserNurse} className="form-icon" />
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
              Please enter your full name as it appears on your caregiver
              certification.
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
              Please enter the city and country where you are based.
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
              Please enter a valid email address where you can be reached.
            </div>
          )}
        </div>
        <div className="form-group">
          <div className="input-group">
            <FontAwesomeIcon icon={faPhoneAlt} className="form-icon" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Phone Number"
              required
            />
          </div>
          {activeInput === "phone" && (
            <div className="input-guide">
              Please enter a phone number where you can be reached.
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
              least one uppercase letter, one lowercase letter,one special
              character(eg @, #) and one number.
            </div>
          )}
        </div>
        <div className="form-group">
          <div className="input-group">
            <FontAwesomeIcon icon={faMoneyBillAlt} className="form-icon" />
            <input
              type="number"
              id="fees"
              name="fees"
              value={formData.fees}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Hourly Fees"
              required
            />
          </div>
          {activeInput === "fees" && (
            <div className="input-guide">
              Please enter your hourly rate for providing caregiver services.
            </div>
          )}
        </div>
        {errors.general && (
          <div className="error-message">{errors.general}</div>
        )}
        <button type="submit" className="submit-button">
          Sign Up as Caregiver
        </button>
      </form>
    </div>
  );
};

export default CaregiverSignupForm;
