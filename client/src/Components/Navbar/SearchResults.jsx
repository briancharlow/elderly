import React from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./search.css";

const SearchResults = ({ searchTerm, searchResults }) => {
  const navigate = useNavigate();

  const handleViewCaregiver = (caregiverId) => {
    navigate(`/home/caregiver/${caregiverId}`);
  };

  return (
    <div className="search-results">
      {searchResults.length === 0 && searchTerm.trim() !== "" ? (
        <div className="no-results">No results found for "{searchTerm}"</div>
      ) : (
        searchResults
          .sort((a, b) => b.ratings - a.ratings) // Sort by ratings in descending order
          .map((result) => (
            <div
              className="search-result"
              key={result.id}
              onClick={() => handleViewCaregiver(result.id)}
            >
              <div className="caregiver-info">
                <h3>{result.fullname}</h3>
                <div className="caregiver-location">
                  <FaMapMarkerAlt />
                  <p>{result.location}</p>
                </div>
              </div>
              <div className="caregiver-rating">
                <FaStar />
                <span>{result.ratings}</span>
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default SearchResults;
