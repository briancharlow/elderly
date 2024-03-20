import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CaregiverDetails = () => {
  const { id } = useParams();
  const [caregiver, setCaregiver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState(null);

  useEffect(() => {
    const fetchCaregiver = async () => {
      try {
        const caregiverResponse = await axios.get(
          `http://localhost:5000/caregiver/${id}`,
          {
            withCredentials: true,
          }
        );
        const caregiverData = caregiverResponse.data;
        if (caregiverData.success) {
          setCaregiver(caregiverData.caregiver);
        } else {
          console.error("Error fetching caregiver:", caregiverData.message);
        }

        const ratingsResponse = await axios.get(
          `http://localhost:5000/ratings/${id}`,
          {
            withCredentials: true,
          }
        );
        const ratingsData = ratingsResponse.data;
        if (ratingsData.success) {
          setRatings(ratingsData.ratings);
        } else {
          console.error("Error fetching ratings:", ratingsData.message);
        }
      } catch (error) {
        console.error("Error fetching caregiver or ratings:", error);
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
      <h3>Ratings</h3>
      {ratings.length > 0 ? (
        <ul>
          {ratings.map((rating) => (
            <li key={rating.id}>
              <p>Rating: {rating.rating}</p>
              <p>Comment: {rating.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No ratings available for this caregiver.</p>
      )}
    </div>
  );
};

export default CaregiverDetails;
