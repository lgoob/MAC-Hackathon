import React from "react";
import { Link } from "react-router-dom";

//Tile Creation for Boards Page
function WhiteboardTile({ id }) {
  return (
    <Link to={`/whiteboards/${id}`}> 
      <div className="flex items-center justify-center h-80 w-80 m-4 bg-gray-300 text-black font-bold rounded-lg shadow-lg hover:bg-gray-400 transition duration-200 ease-in-out text-xl">
        <h2>{id}</h2> {/* ID of boards*/}
      </div>
    </Link>
  );
}

export default WhiteboardTile;


