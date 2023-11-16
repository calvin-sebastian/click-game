import React, { useEffect, useRef, useState } from "react";
import song from "../audio/music/chill.mp3";

// const AudioPlayer = ({ state }) => {
//   const audioFile = song;
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (state && audioRef.current) {
//       audioRef.current.play();
//     }

//     if (!state && audioRef.current) {
//       audioRef.current.pause();
//     }
//   }, [state]);

//   return (
//     <div>
//       <audio ref={audioRef} loop={true}>
//         <source src={audioFile} type="audio/mp3" />
//         Your browser does not support the audio tag.
//       </audio>
//     </div>
//   );
// };

// export default AudioPlayer;

const AudioPlayer = ({ consistency, state, settings }) => {
  const musicEnabled = settings.music;
  const audioFile = song;
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);

  const [speed, setSpeed] = useState(1);

  //   useEffect(() => {
  //     // Create AudioContext only once
  //     if (!audioContextRef.current) {
  //       audioContextRef.current = new (window.AudioContext ||
  //         window.webkitAudioContext)();
  //     }

  //     // Play audio when stage changes
  //     if (stage === 0) {
  //       stopAudio();
  //     } else {
  //       playAudio();
  //     }

  //     // Update speed when consistency changes
  //     const newSpeed =
  //       consistency < 2
  //         ? 0.8
  //         : consistency < 3
  //         ? 1
  //         : consistency < 4
  //         ? 1.2
  //         : consistency < 5
  //         ? 1.4
  //         : consistency < 6
  //         ? 1.6
  //         : consistency < 8
  //         ? 1.8
  //         : 2;

  //     changeSpeed(newSpeed);
  //   }, [consistency, stage]);

  useEffect(() => {
    console.log(settings.music);
    if (settings.music) {
      playAudio();
    } else {
      stopAudio();
    }
  }, [state]);

  const playAudio = () => {
    console.log(audioContextRef, audioRef);
    audioRef.current.play();
    // if (audioContextRef.current) {
    //   const source = audioContextRef.current.createBufferSource();
    //   source.connect(audioContextRef.current.destination);

    //   fetch(audioFile)
    //     .then((response) => response.arrayBuffer())
    //     .then((buffer) => audioContextRef.current.decodeAudioData(buffer))
    //     .then((decodedData) => {
    //       source.buffer = decodedData;
    //       source.playbackRate.value = speed;

    //       // Start the new source
    //       source.start();
    //     })
    //     .catch((error) => console.error("Error loading audio file:", error));
    // }
  };

  const stopAudio = () => {
    audioRef.current.pause();
    // if (audioContextRef.current) {
    //   audioContextRef.current.close();
    //   audioContextRef.current = null;
    // }
  };

  return (
    <div>
      <audio hidden ref={audioRef} loop>
        <source src={audioFile} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>
    </div>
  );
};

export default AudioPlayer;
