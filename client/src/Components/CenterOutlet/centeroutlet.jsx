// CaregiversList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const CaregiversList = () => {
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
      <h2>Caregivers List</h2>
      {loading ? (
        <p>Loading caregivers...</p>
      ) : (
        <ul>
          {caregivers.map((caregiver) => (
            <li key={caregiver.id}>
              {/* Display caregiver information here */}
              <strong>Name:</strong> {caregiver.fullname}{" "}
              {/* Replace with actual property */}
              {/* Add more caregiver details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CaregiversList;
