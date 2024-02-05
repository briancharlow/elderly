import React, { useState } from "react";
import "./signup.css";

const GuardianSignUpForm = ({ onSignUp }) => {
  const [emergencyContact, setEmergencyContact] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform any necessary form validation here before submitting.
    // Once validated, call the onSignUp function to handle signup.
    onSignUp({
      emergencyContact,
      password,
    });
  };

  return (
    <div className="form-container sign-up">
      <form onSubmit={handleSubmit}>
        <h1>Guardian Sign Up</h1>
        <input
          type="text"
          placeholder="Emergency Contact"
          value={emergencyContact}
          onChange={(e) => setEmergencyContact(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up as Guardian</button>
      </form>
    </div>
  );
};

export default GuardianSignUpForm;
