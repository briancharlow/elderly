import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./caregiver.css";

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

        console.log(caregiverData.caregiver[0]);
        if (caregiverData.success) {
          setCaregiver(caregiverData.caregiver[0]);
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
    <div className="view-more">
      <div className="credentials">
        <div className=" left">
          <h2>{caregiver.fullname}</h2>
          <p>Location: {caregiver.location}</p>
          <p>Specialization: {caregiver.qualifications}</p>
          <p>Description: {caregiver.description}</p>
        </div>
        <div className="right">
          <h2>Status: {caregiver.status}</h2>
          <p>Contact: {caregiver.phone_number}</p>
          <p>Education: {caregiver.education} </p>
          <p>Date Certified: {caregiver.date_of_certification}</p>
        </div>
      </div>
      <div className="ratings">
        <h2>Reviews</h2>
        {ratings.length > 0 ? (
          <div className="ratings-list">
            {ratings.map((rating) => (
              <div className="rating" key={rating.id}>
                <h3>{rating.client_name}</h3>
                <p>{rating.rating}</p>
                <p>{rating.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No ratings available for this caregiver.</p>
        )}
      </div>
    </div>
  );
};

export default CaregiverDetails;
