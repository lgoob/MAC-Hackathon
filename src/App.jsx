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
  );
}

export default App;
