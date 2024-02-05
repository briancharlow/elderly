// SearchResults.js
import React from "react";
import { FaUser } from "react-icons/fa";
import Avatar from "@material-ui/core/Avatar";

const SearchResults = ({ searchTerm, searchResults }) => {
  return (
    <div className="search-results">
      {searchResults.length === 0 && searchTerm.trim() !== "" ? (
        <div className="no-results">No results found for "{searchTerm}"</div>
      ) : (
        searchResults.map((result) => (
          <div className="search-result" key={result.id}>
            <Avatar
              // Use default avatar if profilePicture is not available
              // alt=""
              className="avatar"
            />
            <div className="user-info">
              <span className="username">{result.fullname}</span>
              {/* You can display additional user information here */}
            </div>
            {/* Add buttons/icons for actions like adding or removing users */}
            <FaUser className="add-user-icon" /> {/* Example: Add user */}
            {/* You can add more icons/buttons for actions */}
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
