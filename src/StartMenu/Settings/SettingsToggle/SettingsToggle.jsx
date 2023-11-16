import React from "react";
import "./settingsToggle.css";

export default function CustomToggle({ onClick, state }) {
  return (
    <button onClick={onClick} className={`toggle${state ? "-on" : "-off"}`}>
      <div className={`${state ? "on" : "off"}`}></div>
    </button>
  );
}
