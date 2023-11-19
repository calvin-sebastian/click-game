import React, { useEffect, useRef } from "react";

const FullScreenComponent = ({ children, settings, setSettings }) => {
  const containerRef = useRef(null);
  const container = containerRef.current;

  const requestFullScreen = () => {
    if (container?.requestFullscreen) {
      container.requestFullscreen();
    } else if (container?.mozRequestFullScreen) {
      container.mozRequestFullScreen();
    } else if (container?.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    } else if (container?.msRequestFullscreen) {
      container.msRequestFullscreen();
    }
  };

  const exitFullScreen = () => {
    if (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  useEffect(() => {
    if (settings.fullScreen) {
      console.log(settings.fullScreen);
      requestFullScreen();
    } else {
      exitFullScreen();
    }

    return () => {};
  }, [settings.fullScreen]);

  useEffect(() => {
    if (
      (document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement) &&
      settings.fullScreen
    ) {
      setSettings((curr) => ({ ...curr, fullScreen: true }));
    } else if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement &&
      !settings.fullScreen
    ) {
      setSettings((curr) => ({ ...curr, fullScreen: false }));
    }

    return () => {};
  }, [
    document.fullscreenElement,
    document.mozFullScreenElement,
    document.webkitFullscreenElement,
    document.msFullscreenElement,
  ]);

  return <div ref={containerRef}>{children}</div>;
};

export default FullScreenComponent;
