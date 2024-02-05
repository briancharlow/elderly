import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashLoader } from "react-spinners";
import { FaUser, FaUsers, FaStickyNote, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { AiOutlineEdit } from "react-icons/ai"; // Import the pen/quill icon
import "./profile.css";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfileFromAPI();
  }, []);

  const handleProfileClick = () => {
    if (profile) {
      navigate(`/home/profilePage/${profile.user_id}`);
    } else {
      toast.error("Failed to fetch user profile. Please try again.");
    }
  };

  const fetchUserProfileFromAPI = async () => {
    try {
      const response = await axios.get("http://localhost:5010/Profile", {
        withCredentials: true,
      }); // Replace with the actual API endpoint
      const data = response.data;

      if (data.success) {
        setProfile(data.profile);
      } else {
        console.log("Failed to fetch user profile:", data.message);
        toast.error("Failed to fetch user profile. Please try again.");
      }
    } catch (error) {
      console.log("Error while fetching user profile:", error);
      //   toast.error("Error while fetching user profile. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <HashLoader color="#00BFFF" loading={isLoading} size={80} />
        <p>Loading user profile...</p>
      </div>
    );
  }

  return (
    <div className="user-profile">
      {profile ? (
        <>
          <div className="profile-info">
            <div className="pro-data" onClick={handleProfileClick}>
              {profile.profile_picture ? (
                <Avatar src={profile.profile_picture} alt="Profile" />
              ) : (
                <Avatar> {profile.username[0].toUpperCase()} </Avatar>
              )}
              <div className="follow-count">
                <span>
                  <FaUsers className="follow-icon" /> Followers:{" "}
                  {profile.followers_count}
                </span>
                <span>
                  <FaUsers className="follow-icon" /> Following:{" "}
                  {profile.following_count}
                </span>
                <span>
                  <FaStickyNote className="follow-icon" /> Posts:{" "}
                  {profile.posts.length}
                </span>
              </div>
            </div>
            <div className="bio">
              <h2>{profile.username}</h2>
              <div className="bio-data">
                {/* Use the pen/quill icon */}
                <p className="bio-bio">
                  <AiOutlineEdit className="bio-icon" /> {profile.bio}
                </p>
                <p className="bio-location">
                  <FaMapMarkerAlt className="location-icon" />
                  {profile.location}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No user profile available.</p>
      )}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default UserProfile;
