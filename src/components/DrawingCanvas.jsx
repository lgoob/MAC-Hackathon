import React, { useRef, useEffect } from "react";

//Thanks Indian Man from Youtube!

//Canvas Creation
const DrawingCanvas = ({ color, strokes, setStrokes, id }) => {
  const canvasRef = useRef(null);



  useEffect(() => {
    const canvas = canvasRef.current;

    //cxt == context
    const ctx = canvas.getContext("2d");

    // Set white background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw strokes
    strokes.forEach((stroke) => {
      ctx.fillStyle = stroke.color === "eraser" ? "white" : stroke.color;
      ctx.beginPath();
      ctx.arc(stroke.x, stroke.y, stroke.size / 2, 0, 2 * Math.PI);
      ctx.fill();
    });

    const handleMouseMove = (e) => {
      if (e.buttons === 1) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = 10;
        const drawColor = color === "eraser" ? "white" : color;
        ctx.fillStyle = drawColor;
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
        ctx.fill();
        setStrokes((prev) => [...prev, { x, y, size, color: drawColor }]);
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    return () => canvas.removeEventListener("mousemove", handleMouseMove);
  }, [color, strokes, setStrokes]);

  const clearCanvas = (event) => {
    event.preventDefault();
    setStrokes([]);
    localStorage.setItem(`whiteboard_${id}`, JSON.stringify([]));
  };

  return (
    <div style={{ border: "1px solid black", display: "inline-block" }}>
      <canvas
        ref={canvasRef}
        width={1000}
        height={1000}
        style={{ border: "1px solid black" }}
      ></canvas>
      <button onClick={clearCanvas}>Clear your masterpiece</button>
    </div>
  );
};

export default DrawingCanvas;
