// import React from "react";
// import "../stickyNotePopUp.css";
// import TaskList from "../photosAndIcons/TaskList.png";
// import FreeTextNote from "../photosAndIcons/FreeTextNote.png";

// function StickyNoteChoice({ isVisible, onClose, onTaskNote, onFreeTextNote }) {
//     if (!isVisible) return null; // If not visible, don't render the component

//     return (
//         <div className="popup-overlay">
//             <div className="popup-form">
//                 <form>
//                     <div>
//                         <p>Please select one of the 2 available options:</p>
//                         <button type="button" onClick={onTaskNote}>
//                             Task List
//                             <img src={TaskList} alt="taskListStickyNote" />
//                         </button>
//                         <button type="button" onClick={onFreeTextNote}>
//                             Free Text
//                             <img src={FreeTextNote} alt="freeTextStickyNote" />
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default StickyNoteChoice;
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
                        <p>Please select one of the 2 available options:</p>
                        <button type="button" onClick={onTaskNote}>
                            Task List
                            <img src={TaskList} alt="taskListStickyNote" />
                        </button>
                        <button type="button" onClick={onFreeTextNote}>
                            Free Text
                            <img src={FreeTextNote} alt="freeTextStickyNote" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StickyNoteChoice;
