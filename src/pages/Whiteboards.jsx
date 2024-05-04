import React, { useState, useEffect, useRef } from "react";
import WhiteboardTile from "../components/WhiteboardTile";
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";


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
    <div className="bg-whiteboards bg-cover bg-center bg-no-repeat min-h-screen w-full relative">
      {/* "Lock in" button in the top left corner */}
      <Link to="/">
          <button type="button"
            className="absolute top-4 left-4 w-auto px-6 py-4 text-lg font-semibold text-gray-100 transition-colors duration-200 bg-gray-800 hover:bg-gray-900 border border-gray-700 rounded-lg flex items-center gap-x-3 cursor-pointer"
            >
            <svg className="w-6 h-6 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
              <path strokeLinecap="round" strokeLinejoin="round" 
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            <span>Lock in</span>
          </button>
      </Link>

      {/* Content when there are no whiteboards */}
      {whiteboards.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen w-full">
            <div className="text-center text-4xl font-extrabold h-16 font-serif drop-shadow-[0_1.2px_10px_rgba(0,0,0,0.8)] text-white">
                <h1>Your boards</h1>
            </div>
            <div className="flex flex-col items-center">
                <p className="text-white drop-shadow-[0_1.2px_10px_rgba(0,0,0,0.8)] text-3xl font-semibold text-center">No whiteboards available.</p>
                <button
                    onClick={addWhiteboard}
                    className="px-8 py-4 m-5 bg-orange-800 text-white font-bold rounded-lg shadow-lg hover:bg-orange-900 transition duration-200 ease-in-out text-2xl"
                >
                    Add your first board! +
                </button>
            </div>
        </div>

      ) : (
        // Content when there is at least one whiteboard
        <div className="flex flex-col items-center justify-center pt-36">
          <div className="text-center text-4xl font-extrabold h-16 font-serif drop-shadow-[0_1.2px_10px_rgba(0,0,0,0.8)] text-white">
              <h1>Your boards</h1>
          </div>
          <div className="flex items-center space-x-4">
              <button onClick={addWhiteboard} className="px-8 py-4 m-5 bg-amber-900 text-white font-bold rounded-lg shadow-lg hover:bg-amber-950 transition duration-200 ease-in-out text-xl">Add A Board +</button>
              <button onClick={clearWhiteboard} className="flex items-center space-x-2 text-xl px-8 py-4 bg-amber-900 text-white font-bold rounded-lg shadow-lg hover:bg-amber-950 transition duration-200 ease-in-out">
                  <span>Delete A Board</span>
                  <FaRegTrashAlt />
              </button>
          </div>

          <div className="flex flex-wrap justify-center">
              {whiteboards.map((board) => (
                  <WhiteboardTile key={board.id} id={board.id} />
              ))}
          </div>


        </div>
      )}
    </div>
  );
}

export default Whiteboards;
