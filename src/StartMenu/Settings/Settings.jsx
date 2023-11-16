import React from "react";

export default function Settings({ setShowSettings }) {
  return (
    <div className="settings">
      <div className="button-container">
        <button
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
