import React from "react";
import { Link } from "react-router-dom";

function WhiteboardTile({ id }) {
  return (
    <Link to={`/whiteboards/${id}`}>
      <div style={{ border: "1px solid black", padding: "20px", margin: "10px" }}>
        <h2>Whiteboard {id}</h2>
        <p>Click to edit</p>
      </div>
    </Link>
  );
}

export default WhiteboardTile;


