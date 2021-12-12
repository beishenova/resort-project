import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useRooms } from "../../contexts/RoomsContext";

import "./Search.css";

const Search = () => {
  const { searchResults } = useRooms();
  const navigate = useNavigate();

  const goToRoomDetails = (roomId) => {
    navigate(`/room/${roomId}`);
  };
  //   console.log(searchResults);
  return (
    <>
      <div className="search-box">
        {searchResults.length &&
          searchResults.map((item) => (
            <p
              onClick={() => {
                goToRoomDetails(item.id);
              }}
            >
              {item.title}
            </p>
          ))}
      </div>
    </>
  );
};

export default Search;
