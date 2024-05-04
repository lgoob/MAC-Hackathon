import React, { useState } from "react";
import "./App.css";
import StickyNote from "./components/StickyNote";
import StickyNoteChoice from "./components/StickyNoteChoice";

function App() {
    const [notes, setNotes] = useState([]);
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [chosenType, setChosenType] = useState(null);

    // Function to open the sticky note choice popup
    function openStickyNoteChoice() {
        setVisiblePopup(true);
    }

    // Function to close the sticky note choice popup
    function closeStickyNoteChoice() {
        setVisiblePopup(false);
    }

    // Function to add a new note with the chosen type
    function addNote() {
      console.log("adding a note");
        if (chosenType) {
            // Create a new note object with the chosen type
            const newNote = {
                id: Date.now(),
                type: chosenType,
            };
            // Update the state with the new note
            setNotes((prevNotes) => [...prevNotes, newNote]);

            // Reset chosen type and close the popup
            setChosenType(null);
            closeStickyNoteChoice();
        }
    }

    // Handlers for different types of notes
    function handleTaskNote() {
      console.log("adding a task list note");
        setChosenType("task");
        addNote();
    }

    function handleFreeTextNote() {
      console.log("adding a free text sticky note");
        setChosenType("freeText");
        addNote();
    }

    // Function to remove a note by its ID
    function removeNoteById(noteId) {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    }

    return (
        <div className="app">
            <button className="sticky-btn" onClick={openStickyNoteChoice}>
                Create Note +
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
                    key={note.id}
                    type={note.type}
                    onClose={() => removeNoteById(note.id)}
                />
            ))}
        </div>
    );
}

export default App;
