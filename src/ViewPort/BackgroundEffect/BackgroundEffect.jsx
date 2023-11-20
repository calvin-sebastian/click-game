import React, { useState, useEffect } from "react";
import "./backgroundEffect.css";

const BackgroundEffect = ({ consistency = 6 }) => {
  const [animationDelay, setAnimationDelay] = useState(0);
  const ringCount = 10;

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the animation delay every 6 seconds
      setAnimationDelay((prevDelay) => prevDelay % ringCount);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="full-size-centered">
      {consistency > 5 && (
        <div className="rings anim-pan">
          {[...Array(ringCount)].map((_, index) => {
            return (
              <div
                key={index}
                className="ring anim-zoomIn"
                style={{ "--delay": (animationDelay + index) % ringCount }}
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BackgroundEffect;
