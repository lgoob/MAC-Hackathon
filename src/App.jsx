import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Whiteboard from "./pages/Whiteboard";
import StickyNote from "./components/StickyNote";
import StickyNoteChoice from './components/StickyNoteChoice';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [notes, setNotes] = useState([]);
  const [visiblePopup, setVisiblePopup] = useState(false);

  function getStickyNoteChoice() {
    setVisiblePopup(true);
    // addNote();
  }

  function handleClose() {
    setVisiblePopup(false);
  };

  // function addNote() {
  //     setNotes([
  //         ...notes,
  //         {
  //             id: Date.now(),
  //         },
  //     ])
  // }
  
  function removeNote(noteId) {
      setNotes(notes.filter((item) => item.id !== noteId))
  }

  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Whiteboard" element={<Whiteboard />} />
            <Route path="/StickyNotes" element={<StickyNote />} />
          </Routes>
        </Router>
      </div>
      <div className="App">
          <button className="sticky-btn" onClick={getStickyNoteChoice}>
              Create Note +
          </button>
          {visiblePopup && <StickyNoteChoice isVisible={visiblePopup} onClose={handleClose} />}
          {/* {notes.map((item) => (
              <StickyNote key={item.id} onClose={() => removeNote(item.id)} />
          ))} */}
      </div>
    </>
  );
}

export default App;