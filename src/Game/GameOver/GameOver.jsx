import React, { useEffect, useRef, useState } from "react";
import "./gameOver.css";

export default function GameOver({
  triggerQuit,
  highScores,
  setHighScores,
  score,
}) {
  const [showError, setShowError] = useState(false);

  async function saveHighScore() {
    const activeKey =
      score > highScores.first.value
        ? "first"
        : score > highScores.second.value
        ? "second"
        : "third";

    await setHighScores((curr) => ({
      ...curr,
      [activeKey]: {
        ...curr[activeKey],
        score: score,
      },
    }));

    localStorage.setItem(
      "Skey",
      JSON.stringify({
        ...highScores,
        [activeKey]: { ...highScores[activeKey], score: score },
      })
    );
  }

  return (
    <div className="game-over">
      <div>
        {score < highScores.third.score ? (
          <>
            <h2>Game</h2>
            <h2>Over</h2>
          </>
        ) : (
          <h3>New High Score!</h3>
        )}
      </div>
      <div className="score-container">
        <div className="game-score">
          <h4>1st:</h4>
          {score > highScores.first.score && score ? (
            <CustomInput
              showError={showError}
              autoFocus
              value={highScores.first.name}
              onChange={(e) => {
                if (e.target.value.length > 3) {
                  console.log("too long");
                  setShowError(true);
                  e.target.value = e.target.value.slice(0, 3);
                }
                setHighScores((curr) => ({
                  ...curr,
                  first: {
                    ...first,
                    name: e.target.value,
                  },
                }));
              }}
            ></CustomInput>
          ) : (
            <h4>{highScores.first.name}</h4>
          )}

          <h4 style={{ paddingLeft: "15px" }}>
            {" "}
            {score > highScores.first.score ? score : highScores.first.score}
          </h4>
        </div>
        <div className="game-score">
          <h4>2nd:</h4>
          {score > highScores.second.score && score < highScores.first.score ? (
            <CustomInput
              showError={showError}
              autoFocus
              value={highScores.second.name}
              onChange={(e) => {
                if (e.target.value.length > 3) {
                  console.log("too long");
                  setShowError(true);
                  e.target.value = e.target.value.slice(0, 3);
                }
                setHighScores((curr) => ({
                  ...curr,
                  second: {
                    ...second,
                    name: e.target.value,
                  },
                }));
              }}
            ></CustomInput>
          ) : (
            <h4>{highScores.second.name}</h4>
          )}

          <h4 style={{ paddingLeft: "15px" }}>
            {" "}
            {score > highScores.second.score && score < highScores.first.score
              ? score
              : highScores.second.score}
          </h4>
        </div>
        <div className="game-score">
          <h4>3rd:</h4>
          {score > highScores.third.score && score < highScores.second.score ? (
            <CustomInput
              showError={showError}
              autoFocus
              value={highScores.third.name}
              onChange={(e) => {
                if (e.target.value.length < 4) {
                  setShowError(false);
                } else if (e.target.value.length > 3) {
                  console.log("too long");
                  setShowError(true);
                  e.target.value = e.target.value.slice(0, 3);
                }
                setHighScores((curr) => ({
                  ...curr,
                  third: {
                    ...curr.third,
                    name: e.target.value,
                  },
                }));
              }}
            ></CustomInput>
          ) : (
            <h4>{highScores.third.name}</h4>
          )}

          <h4 style={{ paddingLeft: "15px" }}>
            {" "}
            {score > highScores.third.score && score < highScores.second.score
              ? score
              : highScores.third.score}
          </h4>
        </div>
      </div>
      <div style={{ height: "120px" }}>
        {score > highScores.third.score && (
          <div className="choices">
            <button
              className="restart"
              style={{ width: "100%" }}
              onClick={() => {
                saveHighScore();
              }}
            >
              Save High Score
            </button>
          </div>
        )}
        <div className="choices">
          <button
            className="restart"
            onClick={() => {
              triggerQuit();
            }}
          >
            Restart
          </button>
          <button
            className="quit"
            onClick={() => {
              triggerQuit("start-menu");
            }}
          >
            Quit
          </button>
        </div>
      </div>
    </div>
  );
}

const CustomInput = ({ showError, ...props }) => {
  console.log(showError);
  return (
    <form
      onSubmit={(e) => {
        console.log("submitting");
        e.preventDefault();
        saveHighScore();
      }}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        marginLeft: "0px",
        marginBottom: "15px",
      }}
    >
      <input {...props} className="custom-input"></input>
      <span
        style={{
          color: "red",
          width: "10rem",
          position: "absolute",
          left: "4rem",
          top: "5px",
        }}
      >
        {showError ? "3 Max!" : ""}
      </span>
    </form>
  );
};
