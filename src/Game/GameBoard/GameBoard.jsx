import React, { useCallback, useEffect, useState } from "react";
import { squares } from "./squares";
import "./gameboard.css";
import Alert from "../../Alert/Alert";
import { hateSpeech } from "../../assets/lists/hateSpeech";
import AudioPlayer from "../../Components/AudioPlayer";
import useSound from "use-sound";
import successClick from "../../assets/audio/effects/success2.mp3";
import failClick from "../../assets/audio/effects/fail2.mp3";

export default function GameBoard({
  setScore,
  settings,
  consistency,
  setConsistency,
}) {
  // const newSquareSet = Math.floor(Math.random() * squares.length);
  const newSquareSet = 0;
  const [squareSet, setSquareSet] = useState(squares[newSquareSet]);
  const [resetSwitch, setResetSwitch] = useState(false);
  const [duration, setDuration] = useState(1500);
  const [alert, setAlert] = useState("Good Luck!");
  const [showAlert, setShowAlert] = useState(true);
  const [boardSpin, setBoardSpin] = useState("0");
  const [playSuccess] = useSound(successClick);
  const [playMiss] = useSound(failClick);
  const spinningDiv = document.querySelector(".gameboard-container");
  const isSpinning = document.querySelector(".start-spin");
  const spinningDivStyle = isSpinning
    ? window.getComputedStyle(isSpinning)
    : null;
  const transformValue = spinningDivStyle?.getPropertyValue("transform");
  const matrix = new DOMMatrixReadOnly(transformValue);
  const spinningDivCurrentRotation =
    Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
  console.log(spinningDivCurrentRotation);

  async function handleSquareClick(square) {
    console.log(square);
    if (square?.activated) {
      if (settings.sound) {
        playSuccess();
      }
      if (consistency + 1 === 3) {
        setAlert("Three in a row!");
      } else if (consistency + 1 === 5) {
        setAlert("Five in a row!");
      } else if (consistency + 1 > 5) {
        spinningDiv.classList.add("start-spin");
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
        setScore((curr) => curr + 1);
        setConsistency(10);
      } else {
        setScore((curr) => curr + 1);
      }
    } else {
      setConsistency(0);
      if (consistency + 1 > 5) {
        spinningDiv.classList.remove("start-spin");
        spinningDiv.classList.add("stop-spin");
      }
      if (settings.sound) {
        playMiss();
      }
      setAlert(hateSpeech[newSquareSet]);
    }
  }

  useEffect(() => {
    setShowAlert(true);
    const timeoutId = setTimeout(() => {
      setShowAlert(false);
    }, 1200);
    return () => clearTimeout(timeoutId);
  }, [alert]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Select Random Square
      const selection = Math.floor(Math.random() * squareSet.length);
      const special = Math.floor(Math.random() * squareSet.length);
      const time = Math.floor(Math.random() * (squareSet.length + 9));

      // Set Square behaviours
      const updatedSquares = squareSet.map((square) => {
        if (square.activated === true) {
          if (square.type === "special" || square.type === "time")
            return { ...square, type: "default", activated: false };
          if (square.id === special)
            return { ...square, type: "special", activated: false };
          if (square.id === time)
            return { ...square, type: "time", activated: false };
          return { ...square, activated: false };
        } else if (square.id === selection) {
          if (square.type === "special" || square.type === "time")
            return { ...square, type: "default", activated: true };
          if (square.id === special)
            return { ...square, type: "special", activated: true };
          if (square.id === time)
            return { ...square, type: "time", activated: true };
          return { ...square, activated: true };
        }
        return square;
      });
      setSquareSet(updatedSquares);
      setBoardSpin(
        consistency > 5
          ? "20s"
          : consistency > 9
          ? "15s"
          : consistency > 13
          ? "20s"
          : "0"
      );
      setDuration(
        200 +
          (consistency < 2
            ? 800
            : consistency < 3
            ? 700
            : consistency < 4
            ? 600
            : consistency < 6
            ? 500
            : consistency < 8
            ? 400
            : 300)
      );
      // Trigger reset switch
      setResetSwitch((curr) => !curr);
    }, [duration]);

    return () => clearTimeout(timeoutId);
  }, [resetSwitch]);

  return (
    <div
      style={{
        "--board-spin": boardSpin,
        "--current-rotation": spinningDivCurrentRotation,
      }}
      className={`gameboard-container`}
    >
      <AudioPlayer
        hidden={true}
        controls={false}
        state={settings.music}
        settings={settings}
      />
      {showAlert && <Alert alert={alert} />}

      <div className="gameboard">
        {squareSet.map((square, key) => {
          return (
            <div key={key} className="box-container">
              <button
                className={` ${square?.type} ${square?.color} ${
                  square.activated ? "activated" : ""
                }`}
                onMouseDown={() => {
                  handleSquareClick(square);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
