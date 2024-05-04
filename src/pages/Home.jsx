import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to the Whiteboard App!</h1>
      <Link to="/whiteboards">Go to Whiteboards</Link>
    </div>
  );
}

export default Home;
