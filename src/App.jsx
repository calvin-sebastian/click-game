import { useEffect, useState } from "react";
import "./App.css";
import ViewPort from "./ViewPort/ViewPort";
import GameBoard from "./GameBoard/GameBoard";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import GameOver from "./GameOver/GameOver";

function App() {
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("game-over");
  const [seconds, setSeconds] = useState(30);
  const [highScores, setHighScores] = useState({
    first: { name: "Gud", score: 37 },
    second: { name: "Meh", score: 29 },
    third: { name: "Wmp", score: 13 },
  });

  async function handleRestart() {
    if (score > highScores.third) {
      setHighScores((curr) => ({
        ...curr,
        third: { name: name, score: score },
      }));
    }
    setGameState("play");
    setSeconds(30);
    setScore(0);
  }

  function handleQuit() {
    setGameState("main-menu");
  }

  // useEffect(() => {
  //   if (seconds === 0) {
  //     setGameState("game-over");
  //   }
  // }, [seconds]);

  return (
    <>
      <ViewPort>
        <ScoreBoard
          score={score}
          seconds={seconds}
          setSeconds={setSeconds}
          gameState={gameState}
          setGameState={setGameState}
        />
        <div
          style={{
            height: "400px",
            width: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {gameState === "play" && <GameBoard setScore={setScore} />}
          {gameState === "game-over" && (
            <GameOver
              handleRestart={handleRestart}
              handleQuit={handleQuit}
              highScores={highScores}
              setHighScores={setHighScores}
            />
          )}
        </div>
      </ViewPort>
    </>
  );
}

export default App;
