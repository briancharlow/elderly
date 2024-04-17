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
import "./signup.css"; // Import the CSS stylesheet
import { useNavigate } from "react-router-dom";

const CaregiverSignupForm = () => {
  const [formData, setFormData] = useState({
    certification_id: "",
    fullname: "",
    location: "",
    email: "",
    phone: "",
    password: "",
    fees: "", // Include fees in formData state
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
        "http://localhost:5000/createcaregiver",
        formData
      );
      console.log(response.data);
      if (response.data.success) {
        alert("Caregiver created successfully!");
        alert("Please login with your new credentials to continue");
        navigate("/login");
      } else {
        alert("Caregiver creation failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error creating caregiver:", error);
      alert("Internal Server Error. Please try again later.");
    }
  };

  return (
    <div className="create-caregiver-form">
      <h2>Create Caregiver</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faUserNurse} /> Certification ID
          </label>
          <input
            type="text"
            name="certification_id"
            value={formData.certification_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faUserNurse} /> Full Name
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
            <FontAwesomeIcon icon={faMoneyBillAlt} /> Fees
          </label>
          <input
            type="text"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Caregiver</button>
      </form>
    </div>
  );
};

export default CaregiverSignupForm;
