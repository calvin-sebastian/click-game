import React from "react";
import "./alert.css";

export default function Alert({ alert }) {
  return (
    <>
      {alert && (
        <div className="alert">
          <span>{alert}</span>
        </div>
      )}
    </>
  );
}
