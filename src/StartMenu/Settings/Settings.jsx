import React from "react";
import SettingsToggle from "./SettingsToggle/SettingsToggle.jsx";
import "./settings.css";

export default function Settings({ setShowSettings, settings, setSettings }) {
  return (
    <div className="settings">
      <div className="setting-container">
        <span className="setting-label">Music</span>
        <SettingsToggle
          onClick={() => {
            localStorage.setItem(
              "settings",
              JSON.stringify({ ...settings, music: !settings.music })
            );
            setSettings((curr) => ({ ...curr, music: !curr.music }));
          }}
          state={settings.music}
        />
      </div>
      <div className="setting-container">
        <span className="setting-label">Sounds</span>
        <SettingsToggle
          onClick={() => {
            setSettings((curr) => ({ ...curr, sound: !curr.sound }));
            localStorage.setItem(
              "settings",
              JSON.stringify({ ...settings, sound: !settings.sound })
            );
          }}
          state={settings.sound}
        />
      </div>

      <button
        className="full-screen-button"
        onClick={() => {
          setSettings((curr) => ({ ...curr, fullScreen: !curr.fullScreen }));
        }}
      >
        Toggle Full Screen
      </button>
      <div className="button-container">
        <button
          className="start-menu-button"
          onClick={() => {
            setShowSettings(false);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}
