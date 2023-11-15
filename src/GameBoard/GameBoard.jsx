import React, { useCallback, useEffect, useState } from "react";
import { squares } from "./squares";
import "./gameboard.css";
import Alert from "../Alert/Alert";
import { hateSpeech } from "../assets/hateSpeech";

export default function GameBoard({ setScore }) {
  const newSquareSet = Math.floor(Math.random() * squares.length);
  const [squareSet, setSquareSet] = useState(squares[newSquareSet]);
  const [resetSwitch, setResetSwitch] = useState(false);
  const [duration, setDuration] = useState(1500);
  const [consistency, setConsistency] = useState(0);
  const [alert, setAlert] = useState("Good Luck!");
  const [showAlert, setShowAlert] = useState(true);

  async function handleSquareClick(square) {
    console.log(consistency);
    if (square?.activated) {
      if (consistency + 1 === 3) {
        setAlert("Three in a row!");
      } else if (consistency + 1 === 5) {
        setAlert("Five in a row!");
      } else if (consistency + 1 === 10) {
        setAlert("You're Unstoppable!");
      }
      setConsistency((curr) => curr + 1);
      setSquareSet(squares[newSquareSet]);
      setResetSwitch((curr) => {
        return !curr;
      });
      if (square.type === "special") {
        setAlert("Speed Boost!");
        setScore((curr) => curr + 3);
        setConsistency(10);
      } else {
        setScore((curr) => curr + 1);
      }
    } else {
      setConsistency(0);
      setAlert(hateSpeech[newSquareSet]);
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Select Random Square

      const selection = Math.floor(Math.random() * squareSet.length);

      // Set Square to Active
      const updatedSquares = squareSet.map((square) => {
        if (square.activated === true) {
          return { ...square, activated: false };
        } else if (square.id === selection) {
          return { ...square, activated: true };
        }
        return square;
      });
      setSquareSet(updatedSquares);

      // Trigger reset switch
      setResetSwitch((curr) => !curr);
      setDuration(
        Math.floor(Math.random() * 250) + consistency < 2
          ? 800
          : consistency < 4
          ? 600
          : consistency < 6
          ? 400
          : 250
      );
    }, [duration]);

    return () => clearTimeout(timeoutId);
  }, [resetSwitch]);

  useEffect(() => {
    setShowAlert(true);
    const timeoutId = setTimeout(() => {
      setShowAlert(false);
    }, 1200);
    return () => clearTimeout(timeoutId);
  }, [alert]);

  return (
    <div className="gameboard-container">
      {showAlert && <Alert alert={alert} />}
      <div className="gameboard">
        {squareSet.map((square, key) => {
          return (
            <button
              key={key}
              className={` ${
                square.type === "default"
                  ? "default"
                  : square.type === "special"
                  ? "special"
                  : square.type === "alternate"
                  ? "alternate"
                  : ""
              } ${
                square.color === "primary"
                  ? "primary"
                  : square.color === "secondary"
                  ? "secondary"
                  : square.color === "tertiary"
                  ? "tertiary"
                  : ""
              } ${square.activated ? "activated" : ""}`}
              onMouseDown={() => {
                handleSquareClick(square);
              }}
            ></button>
          );
        })}
      </div>
    </div>
  );
}
