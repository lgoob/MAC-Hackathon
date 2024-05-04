// Whiteboard.jsx
import React, { useState } from "react";
import DrawingCanvas from "../components/DrawingCanvas";
import Pens from "../components/Utility Bar/Pens";

function Whiteboard() {
  const [color, setColor] = useState("red");

  return (
    <div>
      <h1>Draw your masterpiece on our whiteboard</h1>
      <DrawingCanvas color={color}></DrawingCanvas>
      <Pens setColour={setColor}></Pens> {/* Update setColour to setColor */}
    </div>
  );
}

export default Whiteboard;