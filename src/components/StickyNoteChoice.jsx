import React from "react";
import "../stickyNotePopUp.css";
import TaskList from "../photosAndIcons/TaskList.png";
import FreeTextNote from "../photosAndIcons/FreeTextNote.png";

function StickyNoteChoice({ isVisible, onClose, onTaskNote, onFreeTextNote }) {
  if (!isVisible) return null; // If not visible, don't render the component

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <form>
          <div>
            <p className="text-2xl font-bold mb-5">Pick your sticky note</p>
            <div className="flex flex-row space-x-5">
              <div
                className="bg-white rounded-lg shadow-md p-4 w-48 border-2"
                onClick={onTaskNote}
              >
                <button type="button" className="w-full">
                  <p className="text-sm font-semibold mb-3">Task list</p>
                  <img
                    src={TaskList}
                    alt="taskListStickyNote"
                    className="w-full"
                  />
                </button>
              </div>
              <div
                className="bg-white rounded-lg shadow-md p-4 w-48 border-2"
                onClick={onFreeTextNote}
              >
                <button type="button" className="w-full">
                  <p className="text-sm font-semibold mb-3">Free text</p>
                  <img
                    src={FreeTextNote}
                    alt="freeTextStickyNote"
                    className="w-full"
                  />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StickyNoteChoice;
