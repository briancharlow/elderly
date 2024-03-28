import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Clarence = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const handleCaregiver = () => {
    navigate("/caregiver", {
      state: { name: name, email: email, address: address },
    });
  };
  const handleGuardian = () => {
    navigate("/guardian", {
      state: { fullname: name, email: email, address: address },
    });
  };
  return (
    <div>
      <form>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="name"
          placeholder="enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="address"
          placeholdeer="enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div>
          <button onClick={handleCaregiver}>Caregiver</button>
          <button onClick={handleGuardian}>Guardian</button>
        </div>
      </form>
    </div>
  );
};

export default Clarence;
