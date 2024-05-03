import React from "react";
import ReactCanvasPaint from "react-canvas-paint";
import DrawingCanvas from "../components/DrawingCanvas";

function Whiteboard() {
  return (
    <div>
      <h1>Draw your masterpiece on our whiteboard</h1>
      <h3>Help guys this took so long</h3>
      <h5>plz help</h5>
      <h6>
        https://stackoverflow.com/questions/48082509/add-local-storage-to-save-canvas-drawing
        + A little bit of magic with AI
      </h6>
      <DrawingCanvas />
    </div>
  );
}

export default Whiteboard;
