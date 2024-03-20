// CaregiversList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar } from "@material-ui/core";
import "./center.css";
import { useNavigate } from "react-router-dom";

const CaregiversList = () => {
  const navigate = useNavigate();

  const handleViewMore = (caregiverId) => {
    navigate(`/caregiver/${caregiverId}`);
  };

  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getcaregivers",
          {
            withCredentials: true, // Include credentials in the request
          }
        );
        const data = response.data;
        console.log(data.caregivers);
        if (data.success) {
          setCaregivers(data.caregivers);
        } else {
          console.error("Error fetching caregivers:", data.message);
        }
      } catch (error) {
        console.error("Error fetching caregivers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaregivers();
  }, []);

  return (
    <div className="caregivers-list">
      {loading ? (
        <p>Loading caregivers...</p>
      ) : (
        <>
          {caregivers.map((caregiver) => (
            <div className="caregiver" key={caregiver.id}>
              <div className="profile">
                <Avatar> {caregiver.fullname[0].toUpperCase()} </Avatar>
                <div className="caregiver-details">
                  <h3>{caregiver.fullname}</h3>
                  <p>{caregiver.location}</p>
                </div>
              </div>
              <div className="qualifications">
                <strong>Specialization: {caregiver.qualifications}</strong>
                <p>{caregiver.description}</p>
              </div>
              <hr />
              <div className="caregiver-actions">
                <span>Rating: {caregiver.ratings}</span>
                <button>View more</button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CaregiversList;
