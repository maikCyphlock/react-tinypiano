import React, { useState } from "react";
import Octave from "./components/Octave";

import { notes } from "./helpers";

const PIANOKEY = [
  { mapkey: "<", note: "A2", playing: false },
  { mapkey: "a", note: "Bb2", playing: false },
  { mapkey: "z", note: "B2", playing: false },
  { mapkey: "x", note: "C3", playing: false },
  { mapkey: "d", note: "Db3", playing: false },
  { mapkey: "c", note: "D3", playing: false },
  { mapkey: "f", note: "Eb3", playing: false },
  { mapkey: "v", note: "E3", playing: false },
  { mapkey: "b", note: "F3", playing: false },
  { mapkey: "h", note: "Gb3", playing: false },
  { mapkey: "n", note: "G3", playing: false },
  { mapkey: "j", note: "Ab3", playing: false },
  { mapkey: "m", note: "A3", playing: false },
  { mapkey: "k", note: "Bb3", playing: false },
  { mapkey: ",", note: "B3", playing: false },
  { mapkey: ".", note: "C4", playing: false },
  { mapkey: "ñ", note: "Db4", playing: false },
  { mapkey: "-", note: "D4", playing: false },
  { mapkey: "{", note: "Eb4", playing: false },
  { mapkey: "q", note: "E4", playing: false },
  { mapkey: "w", note: "F4", playing: false },
  { mapkey: "3", note: "Ab4", playing: false },
  { mapkey: "e", note: "A4", playing: false },
  { mapkey: "4", note: "Bb4", playing: false },
  { mapkey: "r", note: "B4", playing: false },
  { mapkey: "t", note: "C5", playing: false },
];

function App() {
  const [sustain, setSustain] = useState(false);
  const AUDIOSLOADED: HTMLAudioElement[] = [];

  const keyboardHandlerDown = (
    e: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    PIANOKEY.map((key) => {
      
      if (e.key === "Shift") {
        setSustain(e => (e == false ? true :false));
      }

      if (key.mapkey === e.key) {
        if (!key.playing) {
          const audio = new Audio(`sounds/${key.note}.ogg`);
          audio.volume = 1;
          document.getElementById(key.note)?.classList.toggle("active");
          audio.play();
          key.playing = true;
          AUDIOSLOADED.push(audio);
        }
      }
    });
  };

  const keyboardHandlerUp = (
    e: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.stopPropagation()
    PIANOKEY.map((key) => {
      if (sustain) {
        if (key.mapkey === e.key) {
          document.getElementById(key.note)?.classList.remove("active");
          key.playing = false;
          const audio = AUDIOSLOADED.shift();
         
        }
      } else {
        if (key.mapkey === e.key) {
          document.getElementById(key.note)?.classList.remove("active");
          key.playing = false;
          const audio = AUDIOSLOADED.shift();
          if (audio) {
            audio.pause();
          }
        }
      }
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    const audio = new Audio(`sounds/${e.currentTarget.value}.ogg`);
    audio.volume = 1;
    audio.play();
  };

  return (
    <div
      onKeyDown={keyboardHandlerDown}
      onKeyUp={keyboardHandlerUp}
      className="piano"
    >
      <Octave notes={notes} clickHandler={handleClick} />
    </div>
  );
}

export default App;
