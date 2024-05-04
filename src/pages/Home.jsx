import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Clock from "../components/Clock";
import quotes from "../components/Motivation.json";
import FocusHourLogo from "../pictures/Icon.jpg";

function Home() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Fetch a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex].quote);
  }, []);

  return (
    <div className="bg-hero h-screen relative">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="absolute top-0 left-0 p-4">
          <img src={FocusHourLogo} alt="Focus Hour Logo" className="h-28 w-28 rounded-lg"/>
        </div>
        <div className="text-center text-xl font-bold mb-4 absolute inset-x-0 top-0 h-16 p-72 font-serif drop-shadow-[0_1.2px_10px_rgba(0,0,0,0.8)] text-white">
          {quote}
        </div>
        <Clock />
        <div className="fixed bottom-20 right-20">
          <button 
            type="button" 
            className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-black focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-black dark:hover:bg-black dark:focus:ring-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" />
              <rect width="2" height="7" x="11" y="6" fill="currentColor" rx="1">
                <animateTransform attributeName="transform" dur="9000s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
              </rect>
              <rect width="2" height="9" x="11" y="11" fill="currentColor" rx="1">
                <animateTransform attributeName="transform" dur="750s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
              </rect>
            </svg>
            <span className="sr-only">Notifications</span>
          </button>
          <button 
            type="button" 
            className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-black focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-black dark:hover:bg-black dark:focus:ring-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor" d="M21 3v12.5a3.5 3.5 0 0 1-3.5 3.5a3.5 3.5 0 0 1-3.5-3.5a3.5 3.5 0 0 1 3.5-3.5c.54 0 1.05.12 1.5.34V6.47L9 8.6v8.9A3.5 3.5 0 0 1 5.5 21A3.5 3.5 0 0 1 2 17.5A3.5 3.5 0 0 1 5.5 14c.54 0 1.05.12 1.5.34V6z" />
          </svg>
            <span className="sr-only">Notifications</span>
          </button>
        </div>
        <div className="absolute bottom-5 w-full text-center">
          <Link 
            to="/Whiteboards" 
            className="text-xl text-white font-bold hover:text-blue-300"
          >
            Click here to enter
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
