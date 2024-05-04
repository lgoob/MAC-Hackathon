import React, { useState } from "react";
import StickyNote from "../components/StickyNote";
import StickyNoteChoice from "../components/StickyNoteChoice";

function StickyNotesPage() {
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

export default StickyNotesPage;