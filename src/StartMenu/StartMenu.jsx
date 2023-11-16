// import React, { useState } from "react";
// import "./StartMenu.css";

// export default function StartMenu({ setGameState }) {
//   const [timer, setTimer] = useState();
//   return (
//     <div className="start-menu">
//       <h2>Box Clicker</h2>
//       {timer && <div>{timer}</div>}
//       <div className="start-ui">
//         <div className="button-container">
//           <button
//             onClick={() => {
//               setTimer(3);
//               setTimeout(() => {
//                 setGameState("play");
//               }, 3000);
//               setGameState("play");
//             }}
//           >
//             Start
//           </button>
//         </div>
//         <div className="button-container">
//           <button>Options</button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "./StartMenu.css";
import Settings from "./Settings/Settings";

export default function StartMenu({ setGameState }) {
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
      <h2>Box Clicker</h2>
      {timer !== null && <div className="timer">{timer}</div>}
      {!showSettings && (
        <div className="start-ui">
          <div className="button-container">
            <button
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
      {showSettings && <Settings setShowSettings={setShowSettings} />}
    </div>
  );
}
