import Home from "./pages/Home";
import Whiteboard from "./pages/Whiteboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Whiteboard" element={<Whiteboard />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
