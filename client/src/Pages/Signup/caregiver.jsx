import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserNurse,
  faMapMarkerAlt,
  faLock,
  faEnvelope,
  faPhoneAlt,
  faGraduationCap,
  faCalendarAlt,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import "./signup.css";

const CaregiverSignupForm = () => {
  const [formData, setFormData] = useState({
    certification_id: "",
    fullname: "",
    location: "",
    email: "",
    phone: "",
    description: "",
    password: "",
    qualifications: "",
    date_of_certification: "",
    institution_of_certification: "",
    fees: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/createcaregiver", formData);
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
        <p>Join our network of dedicated caregivers and make a difference.</p>
      </div>
      <form onSubmit={handleSubmit} className="caregiver-signup-form">
        <div className="form-group">
          <FontAwesomeIcon icon={faUserNurse} className="form-icon" />
          <input
            type="text"
            id="certification_id"
            name="certification_id"
            value={formData.certification_id}
            onChange={handleInputChange}
            placeholder="Certification ID"
            required
          />
          <div className="input-guide">
            Please enter the unique identifier number for your caregiver
            certification.
          </div>
        </div>
        <div className="form-group">
          <FontAwesomeIcon icon={faUserNurse} className="form-icon" />
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
            Please enter your full name as it appears on your caregiver
            certification.
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
            Please enter the city and country where you are based.
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
            Please enter a valid email address where you can be reached.
          </div>
        </div>
        <div className="form-group">
          <FontAwesomeIcon icon={faPhoneAlt} className="form-icon" />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            required
          />
          <div className="input-guide">
            Please enter a phone number where you can be reached.
          </div>
        </div>
        <div className="form-group">
          <FontAwesomeIcon icon={faGraduationCap} className="form-icon" />
          <input
            type="text"
            id="qualifications"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleInputChange}
            placeholder="Qualifications"
            required
          />
          <div className="input-guide">
            Please list your relevant qualifications and certifications.
          </div>
        </div>
        <div className="form-group">
          <FontAwesomeIcon icon={faCalendarAlt} className="form-icon" />
          <input
            type="text"
            id="date_of_certification"
            name="date_of_certification"
            value={formData.date_of_certification}
            onChange={handleInputChange}
            placeholder="Date of Certification"
            required
          />
          <div className="input-guide">
            Please enter the date you received your caregiver certification.
          </div>
        </div>
        <div className="form-group">
          <FontAwesomeIcon icon={faBuilding} className="form-icon" />
          <input
            type="text"
            id="institution_of_certification"
            name="institution_of_certification"
            value={formData.institution_of_certification}
            onChange={handleInputChange}
            placeholder="Institution of Certification"
            required
          />
          <div className="input-guide">
            Please enter the name of the institution that issued your caregiver
            certification.
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
          <FontAwesomeIcon icon={faMoneyBillAlt} className="form-icon" />
          <input
            type="number"
            id="fees"
            name="fees"
            value={formData.fees}
            onChange={handleInputChange}
            placeholder="Hourly Fees"
            required
          />
          <div className="input-guide">
            Please enter your hourly rate for providing caregiver services.
          </div>
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
