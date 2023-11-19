import { useState } from "react";
import "./App.css";
import Viewport from "./viewPort/viewPort";
import StartMenu from "./StartMenu/StartMenu";
import Game from "./Game/Game";
import FullScreenComponent from "./Components/FullScreen";

function App() {
  const [gameState, setGameState] = useState("start-menu");
  const [highScores, setHighScores] = useState(
    JSON.parse(localStorage.getItem("Skey")) || {
      first: { name: "Gud", score: 37 },
      second: { name: "Meh", score: 29 },
      third: { name: "Wmp", score: 13 },
    }
  );
  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem("settings")) || {
      music: true,
      sound: true,
      fullScreen: false,
    }
  );

  return (
    <FullScreenComponent settings={settings} setSettings={setSettings}>
      <Viewport>
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
    </FullScreenComponent>
  );
}

export default App;
