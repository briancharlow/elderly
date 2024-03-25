import React, { useState } from "react";
import axios from "axios";
import "./rating.css";

const RatingForm = ({ caregiverId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/rate/${caregiverId}`,
        {
          rating,
          comment,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert(response.data.message);
        // Reset the form after successful submission
        setRating(0);
        setComment("");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("An error occurred while submitting the rating.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rating-container">
        <label>Rating:</label>
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <label key={ratingValue}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => handleRatingChange(ratingValue)}
                  checked={rating === ratingValue}
                />
                <span
                  className={`star ${rating >= ratingValue ? "filled" : ""}`}
                >
                  &#9733;
                </span>
              </label>
            );
          })}
        </div>
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
      </div>
      <button type="submit">Submit Rating</button>
    </form>
  );
};

export default RatingForm;
