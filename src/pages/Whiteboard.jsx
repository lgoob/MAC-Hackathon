import React, { useState, useEffect } from "react";
import DrawingCanvas from "../components/DrawingCanvas";
import Pens from "../components/Utility Bar/Pens";
import { useParams } from "react-router-dom";

function Whiteboard() {
  const { id } = useParams();
  const [color, setColor] = useState("black");
  const [strokes, setStrokes] = useState([]);

  useEffect(() => {
    // Load strokes from localStorage
    const savedStrokes = localStorage.getItem(`whiteboard_${id}`);
    if (savedStrokes) {
      try {
        setStrokes(JSON.parse(savedStrokes));
      } catch (e) {
        console.error("Error parsing strokes from localStorage", e);
        setStrokes([]);
      }
    } else {
      setStrokes([]);
    }
  }, [id]);

  useEffect(() => {
    // Save strokes to localStorage when they change, but only after the initial load
    if (strokes.length > 0) {
      localStorage.setItem(`whiteboard_${id}`, JSON.stringify(strokes));
    }
  }, [strokes, id]);

  return (
    <div>
      <h1>Draw your masterpiece on whiteboard {id}</h1>
      <DrawingCanvas color={color} strokes={strokes} setStrokes={setStrokes} id={id} />
      <Pens setColor={setColor} />
    </div>
  );
}

export default Whiteboard;
