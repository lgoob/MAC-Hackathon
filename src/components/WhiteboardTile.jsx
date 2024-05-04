import React from "react";
import { Link } from "react-router-dom";

//Tile Creation for Boards Page
function WhiteboardTile({ id }) {
  return (
    <Link to={`/whiteboards/${id}`}> 
      <div style={{ border: "1px solid black", padding: "20px", margin: "10px" }}>
        <h2>{id}</h2> {/* ID of boards*/}
      </div>
    </Link>
  );
}

export default WhiteboardTile;


