import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Trial = () => {
  const location = useLocation();
  const user = location.state;
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [certificationId, setCertificationId] = useState("");

  const handleSignup = async () => {
    try {
      const result = await axios.post("http://localhost:5000/createcaregiver", {
        ...user,
        certification_id: certificationId,
        phone_number: phone,
        description: description,
        password: password,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        type="text"
        value={certificationId}
        placeholder="certification id"
        onChange={(e) => setCertificationId(e.target.value)}
      />
      <input
        type="text"
        value={phone}
        placeholder="Phone Number"
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        value={description}
        placeholder="Describe qualifications"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.password)}
      />
      <button type="submit" onClick={handleSignup}>
        Submit
      </button>
    </div>
  );
};

export default Trial;
