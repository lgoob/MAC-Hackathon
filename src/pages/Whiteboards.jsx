import React, { useState, useEffect, useRef } from "react";
import WhiteboardTile from "../components/WhiteboardTile";
import { Link } from 'react-router-dom';

function Whiteboards() {
  const [whiteboards, setWhiteboards] = useState([]);
  const [showAddWhiteboardModal, setShowAddWhiteboardModal] = useState(false);
  const [newWhiteboardName, setNewWhiteboardName] = useState("");
  const [remainingCharacters, setRemainingCharacters] = useState(25);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Load ONLY on Initial Mount
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
      isInitialMount.current = false;
    }
  }, []);

  useEffect(() => {
    // Save whiteboards to localStorage on change
    localStorage.setItem("whiteboards", JSON.stringify(whiteboards));
  }, [whiteboards]);

  const handleWhiteboardNameChange = (event) => {
    const input = event.target.value;
    const remaining = 25 - input.length;
    setNewWhiteboardName(input);
    setRemainingCharacters(remaining);
  };

  const addWhiteboard = () => {
    // Only add whiteboard if the input is within the character limit and non-empty
    if (newWhiteboardName.trim() !== "" && remainingCharacters >= 0) {
      const newWhiteboards = [...whiteboards, { id: newWhiteboardName.trim() }];
      setWhiteboards(newWhiteboards);
      setNewWhiteboardName("");
      setRemainingCharacters(25);
      setShowAddWhiteboardModal(false); // Close the modal after adding a whiteboard
    }
  };


  const handleDeleteWhiteboard = (id) => {
    const updatedWhiteboards = whiteboards.filter((board) => board.id !== id);
    setWhiteboards(updatedWhiteboards);
    localStorage.removeItem(`whiteboard_${id}`);
  };


  const openAddWhiteboardModal = () => {
    setShowAddWhiteboardModal(true);
  };

  const closeAddWhiteboardModal = () => {
    setShowAddWhiteboardModal(false);
    // Reset input and remaining characters when closing the modal
    setNewWhiteboardName("");
    setRemainingCharacters(25);
  };

  return (
    <div className="bg-whiteboards bg-cover bg-center bg-no-repeat min-h-screen w-full relative">
      {/* "Lock in" button in the top left corner */}
      <Link to="/">
        <button type="button" className="absolute top-4 left-4 w-auto px-6 py-4 text-lg font-semibold text-gray-100 transition-colors duration-200 bg-gray-800 hover:bg-gray-900 border border-gray-700 rounded-lg flex items-center gap-x-3 cursor-pointer">
          <svg className="w-6 h-6 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"/>
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
            <p className="text-white drop-shadow-[0_1.2px_10px_rgba(0,0,0,0.8)] text-3xl font-semibold text-center">
              No whiteboards available.
            </p>
            <button
              onClick={openAddWhiteboardModal}
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
            <button
              onClick={openAddWhiteboardModal}
              className="px-8 py-4 m-5 bg-amber-900 text-white font-bold rounded-lg shadow-lg hover:bg-amber-950 transition duration-200 ease-in-out text-xl"
            >
              Add A Board +
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 justify-center">
            {whiteboards.map((board) => (
              <WhiteboardTile key={board.id} id={board.id} onDelete={handleDeleteWhiteboard}/>
            ))}
          </div>
        </div>
      )}

      {/* Add Whiteboard Modal */}
      {showAddWhiteboardModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-4 text-orange-800">Add Whiteboard</h3>
          <input
            type="text"
            value={newWhiteboardName}
            onChange={handleWhiteboardNameChange}
            placeholder="Enter whiteboard name"
            className="w-full px-4 py-2 rounded-lg shadow-lg text-lg mb-2 border border-orange-400 focus:outline-none focus:border-orange-600"
            maxLength={25}
          />
          {/* Remaining characters counter */}
          <p className={`text-sm ${remainingCharacters < 0 ? 'text-red-500' : 'text-orange-800'}`}>
            {remainingCharacters < 0 ? '0' : remainingCharacters} characters left
          </p>
      
          <div className="flex justify-between mt-4">
            {/* Add whiteboard button */}
            <button
              onClick={addWhiteboard}
              className={`px-4 py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition duration-200 ease-in-out ${remainingCharacters < 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={remainingCharacters < 0}
            >
              Add
            </button>
      
            {/* Cancel button */}
            <button
              onClick={closeAddWhiteboardModal}
              className="px-4 py-2 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700 transition duration-200 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
}

export default Whiteboards;
