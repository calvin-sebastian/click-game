import React from "react";
import "./gameOver.css";

export default function GameOver({
  handleRestart,
  handleQuit,
  highScores,
  setHighScores,
}) {
  return (
    <div className="game-over">
      <div className="game-score">
        <h4> 1st: {highScores.first.name}</h4>
        <h4>{highScores.first.score}</h4>
      </div>
      <div className="game-score">
        <h4>2nd: {highScores.second.name}</h4>
        <h4>{highScores.second.score}</h4>
      </div>
      <div className="game-score">
        <h4>3rd: {highScores.third.name}</h4>
        <h4>{highScores.third.score}</h4>
      </div>
      <h2>Game Over</h2>
      <div className="choices">
        <button className="restart" onClick={handleRestart}>
          Restart
        </button>
        <button className="quit" onClick={handleQuit}>
          Quit
        </button>
      </div>
    </div>
  );
}
