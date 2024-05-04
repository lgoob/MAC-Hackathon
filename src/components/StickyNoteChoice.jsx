import React from "react";
import "../stickyNotePopUp.css";
import AssignmentTaskList from "../photosAndIcons/AssignmentTaskList.png";
import FreeTextNote from "../photosAndIcons/FreeTextNote.png";


function StickyNoteChoice ({ isVisible, onClose }) {
    if (!isVisible) return null; // If not visible, don't render the component

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log("Form submitted");
        onClose(); // Close the form after submission
    };

    return (
        <div className="popup-overlay">
            <div className="popup-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        Please select one of the 2 available options:
                        <button>Assignment Task List <img src={AssignmentTaskList} alt="taskListStickyNote" /></button>
                        <button>Free text <img src={FreeTextNote} alt="freeTextStickyNote" /></button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StickyNoteChoice;