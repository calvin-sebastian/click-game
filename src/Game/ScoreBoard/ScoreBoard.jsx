import React, { useEffect, useState } from "react";
import "./scoreboard.css";

export default function ScoreBoard({
  score,
  seconds,
  setSeconds,
  stage,
  setStage,
}) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0 && stage !== 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        setStage(0);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds, stage]);
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
