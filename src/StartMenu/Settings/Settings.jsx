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
            setSettings((curr) => ({ ...curr, music: !curr.music }));
          }}
          state={settings.music}
        />
      </div>
      <div className="setting-container">
        <span className="setting-label">Sound Effects</span>
        <SettingsToggle
          onClick={() => {
            setSettings((curr) => ({ ...curr, sound: !curr.sound }));
          }}
          state={settings.sound}
        />
      </div>
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
