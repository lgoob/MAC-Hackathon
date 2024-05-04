import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
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
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
