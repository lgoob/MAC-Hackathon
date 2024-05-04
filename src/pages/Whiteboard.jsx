import React from "react";
import DrawingCanvas from "../components/DrawingCanvas";

function Whiteboard() {
  return (
    <div>
      <h1>Draw your masterpiece on our whiteboard</h1>
      <h6>
        https://stackoverflow.com/questions/48082509/add-local-storage-to-save-canvas-drawing
        + A little bit of magic with AI
      </h6>
      <DrawingCanvas />
    </div>
  );
}

export default Whiteboard;
