import { useEffect, useState } from "react";
import "./App.css";
import Viewport from "./viewPort/viewPort";
import StartMenu from "./StartMenu/StartMenu";
import Game from "./Game/Game";
import AudioPlayer from "./assets/components/AudioPlayer";

function App() {
  const [gameState, setGameState] = useState("start-menu");
  const [highScores, setHighScores] = useState({
    first: { name: "Gud", score: 37 },
    second: { name: "Meh", score: 29 },
    third: { name: "Wmp", score: 13 },
  });
  const [settings, setSettings] = useState({
    music: false,
    sound: false,
  });

  // useEffect(() => {
  //   if (seconds === 0) {
  //     setGameState("game-over");
  //   }
  // }, [seconds]);

  return (
    <>
      <Viewport>
        <AudioPlayer
          hidden={true}
          controls={false}
          state={settings.music}
          settings={settings}
        />
        {gameState === "start-menu" && (
          <StartMenu
            setGameState={setGameState}
            settings={settings}
            setSettings={setSettings}
          />
        )}
        {gameState === "play" && (
          <Game
            highScores={highScores}
            setHighScores={setHighScores}
            setGameState={setGameState}
            settings={settings}
          />
        )}
      </Viewport>
    </>
  );
}

export default App;
