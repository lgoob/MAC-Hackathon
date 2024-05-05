import React, { useState, useEffect } from "react";
import DrawingCanvas from "../components/DrawingCanvas";
import Pens from "../components/Utility Bar/Pens";
import { useParams, Link } from "react-router-dom";
import StickyNotesPage from "./StickyNotesPage";
import Corkboard from "../components/Corkboard";
import { IoIosArrowBack } from "react-icons/io";

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
    <div className="min-h-screen min-w-screen flex flex-col items-center relative">
      <Link to="/whiteboards" className="absolute top-4 left-4">
        <button className="text-black hover:underline font-bold py-2 px-4 rounded-lg">
          <span className="flex items-center gap-x-2">
            <IoIosArrowBack />
            Return to boards
          </span>
        </button>
      </Link>

      <h1 className="mt-4 text-xl font-bold text-center bg-blue-100 px-20 py-2 rounded-lg">
        {id}
      </h1>

      <div className="flex flex-row gap-x-5 w-full h-[calc(100vh-8rem)] mt-5">
        <div className="w-9/12 h-full self-start ml-5 relative">
          <DrawingCanvas
            color={color}
            strokes={strokes}
            setStrokes={setStrokes}
            id={id}
          />
          <div className="absolute top-0 left-0">
            <StickyNotesPage />
          </div>
        </div>
        <div className="w-3/12 h-full self-end mr-5">
          <Corkboard />
        </div>
      </div>
      <Pens setColor={setColor} />
    </div>
  );
}

export default Whiteboard;
