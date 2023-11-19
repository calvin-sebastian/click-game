import React, { useEffect, useState } from "react";
import "./game.css";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import GameBoard from "./GameBoard/GameBoard";
import GameOver from "./GameOver/GameOver";
import gameOver from "../assets/audio/effects/game-over.mp3";
import useSound from "use-sound";

export default function Game({
  highScores,
  setHighScores,
  setGameState,
  settings,
}) {
  //
  //  --------------------  Variables  --------------------  //

  const [stage, setStage] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");

  //  --------------------  Functions  --------------------  //

  async function handleRestart() {
    setStage(1);
    setSeconds(30);
    setScore(0);
  }

  function handleQuit() {
    setGameState("start-menu");
  }

  const [play] = useSound(gameOver);

  useEffect(() => {
    if (stage === 0 && settings.sound) {
      play();
    }
  }, [stage]);

  //  --------------------  JSX  --------------------  //

  return (
    <>
      {stage !== 0 && (
        <ScoreBoard
          score={score}
          seconds={seconds}
          setSeconds={setSeconds}
          stage={stage}
          setStage={setStage}
        />
      )}
      {stage === 1 && (
        <GameBoard setScore={setScore} settings={settings} stage={stage} />
      )}
      {stage === 0 && (
        <GameOver
          handleRestart={handleRestart}
          handleQuit={handleQuit}
          highScores={highScores}
          setHighScores={setHighScores}
          score={score}
          setName={setName}
        />
      )}
    </>
  );
}
