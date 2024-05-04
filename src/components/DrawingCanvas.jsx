// DrawingCanvas.jsx
import React, { useRef, useEffect, useState } from "react";
import Pens from "./Utility Bar/Pens";

const DrawingCanvas = ({ color }) => {
  const canvasRef = useRef(null);
  const [size, setSize] = useState(10);
  const [isErasing, setIsErasing] = useState(false); // Track erasing mode

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let strokes = [];

    // Set white background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Restore strokes from storage
    const storedStrokes = localStorage.getItem("strokes");
    if (storedStrokes) {
      strokes = JSON.parse(storedStrokes);
      strokes.forEach((stroke) => {
        ctx.fillStyle = stroke.color;
        ctx.beginPath();
        ctx.arc(stroke.x, stroke.y, stroke.size / 2, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    // Event listeners
    const handleMouseMove = (e) => {
      if (e.buttons === 1) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (isErasing) {
          ctx.fillStyle = "white"; // Use white to "erase"
          ctx.beginPath();
          ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
          ctx.fill();
          setSize(20);

          // Remove erased stroke from strokes array
          strokes = strokes.filter((stroke) => {
            return !(
              x > stroke.x - stroke.size / 2 &&
              x < stroke.x + stroke.size / 2 &&
              y > stroke.y - stroke.size / 2 &&
              y < stroke.y + stroke.size / 2
            );
          });

          // Update localStorage immediately
          localStorage.setItem("strokes", JSON.stringify(strokes));
        } else {
          setSize(10);
          ctx.fillStyle = color; // Use the color prop
          ctx.beginPath();
          ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
          ctx.fill();

          strokes.push({ x, y, size, color });
        }
      }
    };

    const handleMouseUp = () => {
      localStorage.setItem("strokes", JSON.stringify(strokes));
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [color, size, isErasing]);

  const clearCanvas = () => {
    event.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Use canvas background color for eraser
    const eraserColor = canvas.style.backgroundColor || "white";
    ctx.fillStyle = eraserColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    localStorage.removeItem("strokes");
  };

  return (
    <div style={{ border: "1px solid black", display: "inline-block" }}>
      <canvas
        ref={canvasRef}
        id="my-canvas"
        width={1000} //Customisable Width
        height={1000} //Customizable Height
        style={{ border: "1px solid black" }}
      ></canvas>
      <button onClick={() => setIsErasing(!isErasing)}>Toggle Eraser</button>
      <button onClick={clearCanvas}>Clear your masterpiece</button>
    </div>
  );
};

export default DrawingCanvas;


