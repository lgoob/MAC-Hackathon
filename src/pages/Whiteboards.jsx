import React, { useState, useEffect, useRef } from "react";
import WhiteboardTile from "../components/WhiteboardTile";




function Whiteboards() {
  const [whiteboards, setWhiteboards] = useState([]);
  const isInitialMount = useRef(true); {/*useRef to track initial mount as randomly getting overriden by another file*/}





  useEffect(() => {
    //Load ONLY on Initial Mount (otherwise removed from local on second pass)
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
      isInitialMount.current = false; //Checks if initial mount or not
    }
  }, []); 




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



{/*Clear Whiteboard - might add Remove icon later*/}
const clearWhiteboard = () => {
    const whiteboardIdToRemove = prompt("Enter the ID of the whiteboard to remove:");
    if (whiteboardIdToRemove) {
      // Filter out the whiteboard to remove
      const updatedWhiteboards = whiteboards.filter((board) => board.id !== whiteboardIdToRemove);
      setWhiteboards(updatedWhiteboards);
    //Also remove data from localStorage
      localStorage.removeItem("whiteboard_" + whiteboardIdToRemove);
    }
  };
  

  return (
    <div>
      <h1>Whiteboards</h1>
      <button onClick={addWhiteboard}>Add New Whiteboard</button>
      <button onClick={clearWhiteboard}>Remove Selected Whiteboard</button>
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
