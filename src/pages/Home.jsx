import React from "react";
import HeadLineFullPage from "../components/HeadLineFullPage";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <HeadLineFullPage
        title="Welcome to the Whiteboard App!"
        secondary="Create and share your own whiteboards."
      />
          <Link to="/whiteboards">Go to Whiteboards</Link>
    </div>
  );
}

export default Home;
