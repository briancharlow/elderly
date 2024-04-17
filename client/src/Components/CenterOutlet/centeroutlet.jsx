import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faStar,
  faUserGraduate,
  faCertificate,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./center.css";

const CaregiversList = () => {
  const navigate = useNavigate();
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getcaregivers",
          {
            withCredentials: true,
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

  const handleViewMore = (caregiverId) => {
    navigate(`/home/caregiver/${caregiverId}`);
  };

  return (
    <div className="caregivers-list">
      {loading ? (
        <p>Loading caregivers...</p>
      ) : (
        <div className="caregiver-cards">
          {caregivers.map((caregiver) => (
            <div className="caregiver-card" key={caregiver.id}>
              <div className="caregiver-profile">
                <div className="caregiver-avatar">
                  {caregiver.fullname.charAt(0).toUpperCase()}
                </div>
                <div className="caregiver-info">
                  <h3>{caregiver.fullname}</h3>
                  <div className="caregiver-location">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <p>{caregiver.location}</p>
                  </div>
                </div>
              </div>
              <div className="caregiver-details">
                <div className="caregiver-detail">
                  <FontAwesomeIcon icon={faUserGraduate} />
                  <p>
                    <strong>Education:</strong> {caregiver.education}
                  </p>
                </div>
                <div className="caregiver-detail">
                  <FontAwesomeIcon icon={faCertificate} />
                  <p>
                    <strong>Certification:</strong> {caregiver.qualifications}
                  </p>
                </div>
                <div className="caregiver-detail">
                  <FontAwesomeIcon icon={faDollarSign} />
                  <p>
                    <strong>Fees:</strong> ${caregiver.fees}
                  </p>
                </div>
              </div>
              <div className="caregiver-actions">
                <div className="caregiver-rating">
                  <FontAwesomeIcon icon={faStar} />
                  <span>{caregiver.ratings}</span>
                </div>
                <button
                  className="view-more-btn"
                  onClick={() => handleViewMore(caregiver.id)}
                >
                  View more
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CaregiversList;
