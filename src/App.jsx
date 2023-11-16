import { useEffect, useState } from "react";
import "./App.css";
import Viewport from "./viewPort/viewPort";
import StartMenu from "./StartMenu/StartMenu";
import Game from "./Game/Game";

function App() {
  const [gameState, setGameState] = useState("start-menu");
  const [highScores, setHighScores] = useState({
    first: { name: "Gud", score: 37 },
    second: { name: "Meh", score: 29 },
    third: { name: "Wmp", score: 13 },
  });

  // useEffect(() => {
  //   if (seconds === 0) {
  //     setGameState("game-over");
  //   }
  // }, [seconds]);

  return (
    <>
      <Viewport>
        {gameState === "start-menu" && (
          <StartMenu setGameState={setGameState} />
        )}
        {gameState === "play" && (
          <Game
            highScores={highScores}
            setHighScores={setHighScores}
            setGameState={setGameState}
          />
        )}
      </Viewport>
    </>
  );
}

export default App;
