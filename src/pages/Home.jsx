import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Clock from "../components/Clock";
import quotes from "../components/Motivation.json";
import PomodoroTimer from "../components/PomodoroTimer";
import backgroundJazz from "../sounds/background-jazz.mp3";
import seaRoad from "../sounds/sea-road.mp3";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import { IoIosTimer } from "react-icons/io";

function Home() {
  const [quote, setQuote] = useState("");
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(1500); // 25 minutes
  const [playingAudio, setPlayingAudio] = useState(null); // Track the currently playing audio
  const [isPlaying, setIsPlaying] = useState(false); // Track if audio is playing or paused

  const backgroundJazzAudio = useRef(new Audio(backgroundJazz));
  const cafeAmbienceAudio = useRef(new Audio(seaRoad));

  useEffect(() => {
    // Fetch a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex].quote);
  }, []);

  const togglePomodoro = () => setShowPomodoro(!showPomodoro);

  const handleAudioToggle = (audioRef) => {
    if (playingAudio && playingAudio !== audioRef) {
      // Pause any other playing audio
      playingAudio.current.pause();
      playingAudio.current.currentTime = playingAudio.current.currentTime; // Maintain current time
      setPlayingAudio(null);
      setIsPlaying(false);
    }

    if (playingAudio === audioRef) {
      // Toggle the current audio
      if (!audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      // No audio is playing, or a different audio was paused, start the new audio
      audioRef.current.play();
      setPlayingAudio(audioRef);
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-hero bg-cover bg-center bg-no-repeat h-screen w-full">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="absolute top-0 left-0 p-4">
          <h1 className="text-5xl text-white shadow-2xl tracking-wide font-mono font-black ">
            focusHour
          </h1>
        </div>
        <div className="bg-black bg-opacity-60 transition-transform w-screen-md rounded-xl p-10 flex flex-col items-center justify-center">
          <div className=" text-xl transition-all max-w-screen-sm text-white shadow-inner font-medium font-serif text-center mb-10">
            {quote}
          </div>
          <Clock />
        </div>
        <div className="fixed bottom-20 right-20 flex items-center space-x-4">
          <button
            type="button"
            className="relative inline-flex items-center rounded-full bg-white p-3"
            onClick={togglePomodoro}
          >
            <IoIosTimer className="size-10" />

            <span className="sr-only">Pomodoro</span>
          </button>

          <div className="bg-white p-4 rounded-lg text-center">
            <h2 className="text-lg font-bold mb-5">Ambient Music</h2>
            <div className="space-x-4">
              <button
                type="button"
                className="p-3 text-sm shadow-md border-t-2 border-white border-l-2 rounded-lg w-28"
                onClick={() => handleAudioToggle(backgroundJazzAudio)}
              >
                {playingAudio === backgroundJazzAudio &&
                !backgroundJazzAudio.current.paused
                  ? "Pause Jazz"
                  : "Play Jazz"}
              </button>
              <button
                type="button"
                className="p-3 text-sm shadow-md border-t-2 border-white border-l-2 rounded-lg w-28"
                onClick={() => handleAudioToggle(cafeAmbienceAudio)}
              >
                {playingAudio === cafeAmbienceAudio &&
                !cafeAmbienceAudio.current.paused
                  ? "Pause Lofi"
                  : "Play Lofi"}
              </button>
            </div>
          </div>
        </div>
        {showPomodoro && (
          <div className="absolute bottom-40 right-40">
            <PomodoroTimer initialTime={pomodoroTime} />
          </div>
        )}
        <div className="absolute bottom-5 opacity-100 transition-opacity bg-white px-7 py-3 rounded-full text-xl text-black font-bold">
          <Link to="/Whiteboards">
            <span className="flex items-center justify-center gap-x-1 translate-x-1">
              See your boards
              <HiMiniArrowUpRight className="size-6" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
