import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGooglePlusG,
  faFacebookF,
  faGithub,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import "./login.css";

import axios from "axios"; // Import Axios

const LoginForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleCaregiverSignUp = async (e) => {
    e.preventDefault();
    navigate("/caregiver");
  };

  const handleGuardianSignUp = async (e) => {
    e.preventDefault();
    navigate("/guardian");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        { email, pwd: password },
        { withCredentials: true }
      );

      const data = response.data;

      if (!data.success) {
        alert(`Login failed: ${data.message}`);
        return;
      } else {
        alert("Login successful");
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <div className={`login ${isSignUp ? "active" : ""}`}>
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faGooglePlusG} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
          {/* <input
            type="text"
            placeholder="Name"
            value={fullname}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          /> */}
          <span className="option"> Sign Up as?</span>
          <div className="signup-as">
            <button onClick={handleCaregiverSignUp}>Caregiver</button>
            <button onClick={handleGuardianSignUp}>Guardian</button>
          </div>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faGooglePlusG} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
          <span>or use your email password</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#">Forget Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div
            className={`toggle-panel toggle-left ${!isSignUp ? "active" : ""}`}
          >
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button onClick={toggleForm}>Sign In</button>
          </div>
          <div
            className={`toggle-panel toggle-right ${isSignUp ? "active" : ""}`}
          >
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all site features</p>
            <button onClick={toggleForm}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
