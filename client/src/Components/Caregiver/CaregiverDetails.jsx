import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CaregiverDetails = () => {
  const { id } = useParams();
  const [caregiver, setCaregiver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaregiver = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/caregiver/${id}`,
          {
            withCredentials: true,
          }
        );
        const data = response.data;
        if (data.success) {
          setCaregiver(data.caregiver);
        } else {
          console.error("Error fetching caregiver:", data.message);
        }
      } catch (error) {
        console.error("Error fetching caregiver:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaregiver();
  }, [id]);

  if (loading) {
    return <p>Loading caregiver details...</p>;
  }

  if (!caregiver) {
    return <p>Caregiver not found</p>;
  }

  return (
    <div>
      <h2>{caregiver.fullname}</h2>
      <p>Location: {caregiver.location}</p>
      <p>Specialization: {caregiver.qualifications}</p>
      <p>Description: {caregiver.description}</p>
      <p>Rating: {caregiver.ratings}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default CaregiverDetails;
