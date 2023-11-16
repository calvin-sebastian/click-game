import React from "react";
import "./viewport.css";

export default function Viewport({ children }) {
  return (
    <div className="viewport">
      <div className="game-container">{children}</div>
    </div>
  );
}
