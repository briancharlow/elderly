import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HashLoader from "react-spinners/HashLoader";
import "./suggested.css";

const Suggested = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getcaregivers", {
        withCredentials: true,
      });
      const data = response.data;
      console.log(data);

      const caregivers = data.caregivers;

      if (data.success) {
        setSuggestions(caregivers);
      } else {
        console.log("Failed to fetch suggestions:", data.message);
      }
    } catch (error) {
      console.log("Error while fetching suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="suggested-users">
      <h2>Suggested Users</h2>
      {isLoading ? (
        <div className="loader-container">
          <HashLoader color="#00BFFF" size={80} />
        </div>
      ) : suggestions.length > 0 ? (
        <div className="users-list">
          {suggestions.map((caregiver) => (
            <div className="user-item" key={caregiver.id}>
              {caregiver.profile_picture ? (
                <Avatar src={caregiver.profile_picture} alt="Profile" />
              ) : (
                <Avatar>{caregiver.fullname[0].toUpperCase()}</Avatar>
              )}
              <div className="user-info">
                <h3>{caregiver.fullname}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No suggested users available.</p>
      )}
    </div>
  );
};

export default Suggested;
