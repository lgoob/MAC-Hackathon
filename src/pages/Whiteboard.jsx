import React, { useState, useEffect } from "react";
import DrawingCanvas from "../components/DrawingCanvas";
import Pens from "../components/Utility Bar/Pens";
import { useParams, Link } from "react-router-dom";


function Whiteboard() {
  const { id } = useParams(); {/* ID of current board*/}
  const [color, setColor] = useState("black"); {/*Set initial colour to black - will revert on page refresh!*/}
  const [strokes, setStrokes] = useState([]); {/*Set strokes for fetch from local*/}

  useEffect(() => {
    {/* ID of boards*/}
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
    
      <h1>Create your masterpiece: {id}</h1>
      <DrawingCanvas color={color} strokes={strokes} setStrokes={setStrokes} id={id} />
      <Pens setColor={setColor} />
      <Link to = "/whiteboards"><button>Return to boards</button></Link>
    </div>
  );
}

export default Whiteboard;
