import React, { useEffect, useState } from "react";
import "./scoreboard.css";

export default function ScoreBoard({
  score,
  seconds,
  setSeconds,
  gameState,
  setGameState,
}) {
  console.log(gameState);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0 && gameState === "play") {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        setGameState("game-over");
        clearInterval(intervalId);
        // Additional actions when the countdown reaches 0
      }
    }, 1000);

    // Clear the interval when the component is unmounted or when seconds reach 0
    return () => clearInterval(intervalId);
  }, [seconds, gameState]);
  return (
    <div className="scoreboard">
      <div className="data-container">
        <span>CLOCK </span>
        <div className="time">{seconds}</div>
      </div>
      <div className="data-container">
        <span>SCORE </span>
        <div className="score">{score}</div>
      </div>
    </div>
  );
}
