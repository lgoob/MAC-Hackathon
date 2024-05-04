<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Whiteboards from "./pages/Whiteboards";
import Whiteboard from "./pages/Whiteboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whiteboards" element={<Whiteboards />} />
        <Route path="/whiteboards/:id" element={<Whiteboard />} />
      </Routes>
    </Router>
=======
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Whiteboards from "./pages/Whiteboards";
import Whiteboard from "./pages/Whiteboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Corkboard from './components/Corkboard'; // Make sure the path is correct


function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Whiteboard" element={<Whiteboard />} />
            <Route path="/Corkboard" element={<Corkboard />} /> 
            <Route path="/whiteboards" element={<Whiteboards />} />
            <Route path="/whiteboards/:id" element={<Whiteboard />} />
          </Routes>
        </Router>
      </div>
    </>
>>>>>>> de723460bfba7857a7382152579ac73ffc6028fe
  );
}

export default App;