import React, { useState, useEffect } from "react";
import "./StartMenu.css";
import Settings from "./Settings/Settings";

export default function StartMenu({ setGameState, settings, setSettings }) {
  const [timer, setTimer] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setGameState("play");
    }

    return () => clearTimeout(countdown);
  }, [timer, setGameState]);

  return (
    <div className="start-menu">
      {!timer && (
        <div className="title">
          <h2 className="red-header">Box</h2>
          <h2> Clicker</h2>
        </div>
      )}
      {timer && <div className="timer">{timer}</div>}
      {!timer && !showSettings && (
        <div className="introcontainer">
          <div className="text-container">
            <div className="left-text">Click</div>
            <div className="right-text"> box.</div>
          </div>
          <div className="text-container">
            <div className="left-text">Don't</div>
            <div className="right-text">miss.</div>
          </div>
          <div className="text-container">
            <div className="left-text">Pretty</div>
            <div className="right-text"> simple.</div>
          </div>
        </div>
      )}
      {!showSettings && !timer && (
        <div className="start-ui">
          <div className="button-container">
            <button
              className="start-menu-button"
              disabled={timer}
              onClick={() => {
                setTimer(3);
              }}
            >
              Start
            </button>
          </div>
          <div className="button-container">
            <button
              className="start-menu-button"
              disabled={timer}
              onClick={() => {
                setShowSettings(true);
              }}
            >
              Settings
            </button>
          </div>
        </div>
      )}
      {showSettings && (
        <Settings
          setShowSettings={setShowSettings}
          settings={settings}
          setSettings={setSettings}
        />
      )}
    </div>
  );
}
