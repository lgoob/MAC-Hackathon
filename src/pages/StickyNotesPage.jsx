import React, { useState, useEffect } from "react";
import StickyNote from "../components/StickyNote";
import StickyNoteChoice from "../components/StickyNoteChoice";
import { FaPlus } from "react-icons/fa6";

function StickyNotesPage() {
  const [notes, setNotes] = useState([]);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [chosenType, setChosenType] = useState(null);
  useEffect(() => {
    const loadedNotes = JSON.parse(localStorage.getItem("stickyNotes"));
    if (loadedNotes) {
      setNotes(loadedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("stickyNotes", JSON.stringify(notes));
  }, [notes]);

  // Function to open the sticky note choice popup
  function openStickyNoteChoice() {
    setVisiblePopup(true);
  }

  // Function to close the sticky note choice popup
  function closeStickyNoteChoice() {
    setVisiblePopup(false);
  }

  // Function to add a new note with the chosen type
  function addNote(type) {
    // Create a new note object with the chosen type
    const newNote = {
      id: Date.now(),
      type,
    };
    // Update the state with the new note
    setNotes((prevNotes) => [...prevNotes, newNote]);
    // Close the popup
    closeStickyNoteChoice();
  }

  // Handlers for different types of notes
  function handleTaskNote() {
    setChosenType("task");
    addNote("task");
  }

  function handleFreeTextNote() {
    setChosenType("freeText");
    addNote("freeText");
  }

  // Function to remove a note by its ID
  function removeNoteById(noteId) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  }

  return (
    <div className="">
      <button
        className="flex flex-row bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition-all text-white items-center m-5"
        onClick={openStickyNoteChoice}
      >
        Add Sticky Note
        <span>
          <FaPlus className="size-4 ml-3" />
        </span>
      </button>

      {/* Render the sticky note choice popup */}
      {visiblePopup && (
        <StickyNoteChoice
          isVisible={visiblePopup}
          onClose={closeStickyNoteChoice}
          onTaskNote={handleTaskNote}
          onFreeTextNote={handleFreeTextNote}
        />
      )}

      {/* Render the sticky notes */}
      {notes.map((note) => (
        <StickyNote
          id={note.id}
          type={note.type}
          onClose={() => removeNoteById(note.id)}
        />
      ))}
    </div>
  );
}

export default StickyNotesPage;
