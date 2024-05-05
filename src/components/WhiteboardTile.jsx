import React from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function WhiteboardTile({ id, onDelete }) {
  return (
    <div className="relative w-80 h-80 m-4 rounded-lg shadow-lg bg-gray-300">
      {/* Delete icon in the top right corner */}
      <button
        onClick={(e) => {
          // Prevent the click event from bubbling up to the parent Link component
          e.stopPropagation();
          e.preventDefault();
          // Call the onDelete function with the id of the whiteboard
          onDelete(id);
        }}
        className="absolute top-2 right-2 text-black focus:outline-none"
      >
        <IoClose size={30} />
      </button>
      
      <Link to={`/whiteboards/${id}`} className="w-full h-full flex items-center justify-center">
        <div className="text-xl font-bold text-black">
          <h2>{id}</h2>
        </div>
      </Link>
    </div>
  );
}

export default WhiteboardTile;
