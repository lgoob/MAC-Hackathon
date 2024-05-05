import React, { useRef, useEffect, useCallback, useState } from "react";

const DrawingCanvas = ({ color, strokes, setStrokes, id }) => {
  const canvasRef = useRef(null);
  const parentDivRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

  const updateCanvasSize = useCallback(() => {
    if (parentDivRef.current) {
      setCanvasWidth(parentDivRef.current.clientWidth);
      setCanvasHeight(parentDivRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    // Initialize the canvas size
    updateCanvasSize();

    // Listen for window resizing
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [updateCanvasSize]);

  const drawStrokes = useCallback((ctx, strokeData) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    strokeData.forEach((stroke) => {
      ctx.fillStyle = stroke.color === "eraser" ? "white" : stroke.color;
      ctx.beginPath();
      ctx.arc(stroke.x, stroke.y, stroke.size / 2, 0, 2 * Math.PI);
      ctx.fill();
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const handleMouseMove = (e) => {
      if (e.buttons === 1) {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);
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
    drawStrokes(ctx, strokes);

    return () => canvas.removeEventListener("mousemove", handleMouseMove);
  }, [color, strokes, setStrokes, drawStrokes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    drawStrokes(ctx, strokes);
  }, [canvasWidth, canvasHeight, drawStrokes, strokes]);

  const clearCanvas = (event) => {
    event.preventDefault();
    setStrokes([]);
    localStorage.setItem(`whiteboard_${id}`, JSON.stringify([]));
  };

  return (
    <div ref={parentDivRef} className="relative w-full h-full flex flex-col items-center">
      <canvas
        ref={canvasRef}
        className="border-4 border-stone-300 rounded-2xl"
      ></canvas>
      <div className="align-left">
      <button
        onClick={clearCanvas}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mt-2 rounded"
      >
        Clear Canvas
      </button>
      </div>
    </div>
  );
};

export default DrawingCanvas;
