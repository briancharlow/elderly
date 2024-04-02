import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";

const CaregiverSignUpForm = () => {
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [certificationId, setCertificationId] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const location = useLocation();

  const user = location.state?.user || {}; // Safely access user from location state
  console.log("this is the user", user);
  const navigate = useNavigate();

  const caregiver = { ...user, phone, description, password, certificationId };

  console.log("this is the caregiver:", caregiver);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(caregiver);
      const response = await axios.post(
        "http://localhost:5000/createcaregiver",
        {
          caregiver,
        }
      );
      console.log("this is the response", response);
      const data = response.data;
      console.log(data);

      if (data.success) {
        setAlertMessage("Signup successful");
        setShowAlert(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setAlertMessage("Signup failed, check credentials and try again");
        setShowAlert(true);
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("An error occurred. Please try again.");
      setShowAlert(true);
    }
  };

  return (
    <Container
      className="mt-5"
      style={{
        border: "1px solid #ccc",
        backgroundColor: "#f0f0f0",
        padding: "20px",
      }}
    >
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <h1 className="text-center mb-4">Welcome Caregiver</h1>

            {showAlert && (
              <Alert
                variant={
                  alertMessage.includes("successful") ? "success" : "danger"
                }
                onClose={() => setShowAlert(false)}
                dismissible
              >
                {alertMessage}
              </Alert>
            )}

            <FloatingLabel
              controlId="formCertificationId"
              label="Certification ID"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter Certification ID"
                value={certificationId}
                onChange={(e) => setCertificationId(e.target.value)}
                required
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="formPhoneNumber"
              label="Phone Number"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="formJobDescription"
              label="Job Description"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Enter job description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ overflowY: "hidden" }}
                required
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="formPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FloatingLabel>
            <Button variant="primary" type="submit" block>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CaregiverSignUpForm;
