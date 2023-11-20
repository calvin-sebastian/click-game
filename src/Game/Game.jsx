import React, { useEffect, useState } from "react";
import "./game.css";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import GameBoard from "./GameBoard/GameBoard";
import GameOver from "./GameOver/GameOver";
import gameOver from "../assets/audio/effects/game-over.mp3";
import useSound from "use-sound";
import BackgroundEffect from "../Viewport/BackgroundEffect/BackgroundEffect";

export default function Game({
  highScores,
  setHighScores,
  setGameState,
  settings,
}) {
  //
  //  --------------------  Variables  --------------------  //

  const [seconds, setSeconds] = useState(30);
  const [score, setScore] = useState(0);
  const [consistency, setConsistency] = useState(0);
  const [stage, setStage] = useState(1);

  //  --------------------  Functions  --------------------  //

  async function triggerQuit(action = false) {
    {
      action && setGameState(action);
    }
    setStage(1);
    setSeconds(30);
    setConsistency(0);
    setScore(0);
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
      <BackgroundEffect consistency={consistency} />
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
        <GameBoard
          setScore={setScore}
          settings={settings}
          stage={stage}
          consistency={consistency}
          setConsistency={setConsistency}
        />
      )}
      {stage === 0 && (
        <GameOver
          triggerQuit={triggerQuit}
          highScores={highScores}
          setHighScores={setHighScores}
          score={score}
        />
      )}
    </>
  );
}
