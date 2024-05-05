import React, { useState, useEffect } from "react";
import DrawingCanvas from "../components/DrawingCanvas";
import Pens from "../components/Utility Bar/Pens";
import { useParams, Link } from "react-router-dom";
import StickyNotesPage from "./StickyNotesPage";
import PomodoroTimer from "../components/PomodoroTimer";

function Whiteboard() {
  const { id } = useParams();
  const [color, setColor] = useState("black");
  const [strokes, setStrokes] = useState([]);

  useEffect(() => {
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
    if (strokes.length > 0) {
      localStorage.setItem(`whiteboard_${id}`, JSON.stringify(strokes));
    }
  }, [strokes, id]);

  return (
    <div className="bg-whiteboard bg-cover bg-center bg-no-repeat min-h-screen w-full flex flex-col items-center">
      <PomodoroTimer />
      <h1 className="mt-4 text-xl font-bold text-center bg-blue-200 p-2 rounded-lg">
        Create your masterpiece: {id}
      </h1>
      <div className="flex flex-row">
        <div class="bottom-0">
          <Pens setColor={setColor} />
          <DrawingCanvas
            color={color}
            strokes={strokes}
            setStrokes={setStrokes}
            id={id}
          />
          <div className="flex justify-center mt-2 "></div>
        </div>
        <div className="ml-4">
          <StickyNotesPage />
        </div>
      </div>
      <Link to="/whiteboards" className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Return to boards
        </button>
      </Link>
    </div>
  );
}

export default Whiteboard;
