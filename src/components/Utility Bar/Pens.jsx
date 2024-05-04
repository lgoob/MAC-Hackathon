import React from "react";

function Pens({ setColour }) {
  const colours = ["black", "red", "blue", "green", "yellow"];

  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
      {colours.map((c) => (
        <div
          key={c}
          style={{ backgroundColour: c, width: "20px", height: "20px", margin: "5px", cursor: "pointer" }}
          onClick={() => setColour(c)}
        ></div>
      ))}
    </div>
  );
}

export default Pens;
