import React from "react";

function Pens({ setColor }) {
  const colours = ["black", "red", "blue", "green", "yellow", "eraser"];

  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
      {colours.map((c) => (
        <div
          key={c}
          style={{
            backgroundColor: c === "eraser" ? "white" : c,
            border: c === "eraser" ? "1px solid black" : "none",
            width: "20px",
            height: "20px",
            margin: "5px",
            cursor: "pointer"
          }}
          onClick={() => setColor(c)}
        ></div>
      ))}
    </div>
  );
}

export default Pens;
