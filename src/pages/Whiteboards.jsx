import React, { useState, useEffect, useRef } from "react";
import WhiteboardTile from "../components/WhiteboardTile";

function Whiteboards() {
  const [whiteboards, setWhiteboards] = useState([]);
  const isInitialMount = useRef(true); // useRef to track initial mount

  useEffect(() => {
    // Load whiteboards from localStorage only on initial mount
    if (isInitialMount.current) {
      const savedWhiteboards = localStorage.getItem("whiteboards");
      if (savedWhiteboards) {
        try {
          setWhiteboards(JSON.parse(savedWhiteboards));
        } catch (e) {
          console.error("Error parsing whiteboards from localStorage", e);
          setWhiteboards([]);
        }
      }
      isInitialMount.current = false; // Update ref after initial mount
    }
  }, []); // Empty dependency array means this effect runs only once, on mount

  useEffect(() => {
    // Save whiteboards to localStorage on change
    localStorage.setItem("whiteboards", JSON.stringify(whiteboards));
  }, [whiteboards]);

  const addWhiteboard = () => {
    const whiteboardId = window.prompt("Enter the whiteboard ID:");
    if (whiteboardId) {
      const id = whiteboardId.trim();
      const newWhiteboards = [...whiteboards, { id }];
      setWhiteboards(newWhiteboards);
    }
  };

  const removeWhiteboard = (idToRemove) => {
    const updatedWhiteboards = whiteboards.filter((board) => board.id !== idToRemove);
    setWhiteboards(updatedWhiteboards);
  };

  const clearWhiteboards = () => {
    const whiteboardIdsToRemove = prompt("Enter the IDs of whiteboards to remove (separated by commas):");
    if (whiteboardIdsToRemove) {
      const idsToRemove = whiteboardIdsToRemove.split(",").map((id) => id.trim());
      const updatedWhiteboards = whiteboards.filter((board) => !idsToRemove.includes(board.id));
      setWhiteboards(updatedWhiteboards);
    }
  };

  return (
    <div>
      <h1>Whiteboards</h1>
      <button onClick={addWhiteboard}>Add New Whiteboard</button>
      <button onClick={clearWhiteboards}>Remove Selected Whiteboards</button>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {whiteboards.map((board) => (
          <WhiteboardTile key={board.id} id={board.id} onRemove={() => removeWhiteboard(board.id)} />
        ))}
      </div>
      {whiteboards.length === 0 && <p>No whiteboards available.</p>}
    </div>
  );
}

export default Whiteboards;
