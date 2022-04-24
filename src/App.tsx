import React, { useState } from "react";
import Octave from "./components/Octave";

import { notes } from "./helpers";

const ImgSrc =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAU1JREFUSEvVlN1RAkEQhD8iUCNAIlAjADIwAyECzUDIQDKADMgAjACNQM0AI9Bqa+dqa539uQceuKe7utnp7umeHXDiZ3Di/vQF+AmEms81F4bG5wlwDXxmFMT/XDtrI1oAz9B5lY5I36pZ5sJSAlgDD4mpHoBKVDv3QHIAL8Aj8AXcA2+ZEd0CW2AIrICnFMQD0Fw/gG9gEjXXWS9FAtkDF8Ao8usPywOw0XiMcjE1xRtgFqvwAMRmDEwDs7g+ByClO+A1qO7OeADHILeWsHTcAtfZq5qC3tta2nKPpRJzA9wlBpfuRRl9AN4BvRdHZIa5scugZINRiql6tagw9qpviqkKTYVMU5ps0VIBaq70XPZZNGtiXthVoJEZkBpr0y3z/2ZvTWpRNCUlg4te1QDUWFeH7hgtk9KlR4y1kCJgV7lLogWgxL767/wBfgE2OEUZ4Z/YGwAAAABJRU5ErkJggg==";

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
  { mapkey: "3", note: "Gb4", playing: false },
  { mapkey: "e", note: "G4", playing: false },
  { mapkey: "4", note: "Ab4", playing: false },
  { mapkey: "r", note: "A4", playing: false },
  { mapkey: "5", note: "Bb4", playing: false },
  { mapkey: "t", note: "B4", playing: false },
  { mapkey: "y", note: "C5", playing: false },
];

function App() {
  const [sustain, setSustain] = useState(false);
  const [isPower, setPower] = useState(false);

  const keyboardHandlerDown = (
    e: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    if (isPower === false) return null;
    e.stopPropagation();
    if (e.shiftKey) {
      setSustain((e) => (e === false ? true : false));
      PIANOKEY.map((key) => {
        const audio = document.getElementById(
          `sounds/${key.note}`
        ) as HTMLAudioElement;
        audio.pause();
      });
    }
    PIANOKEY.map((key) => {
      if (key.mapkey === e.key) {
        if (!key.playing) {
          const audio = document.getElementById(
            `sounds/${key.note}`
          ) as HTMLAudioElement;
          audio.currentTime = 0;
          audio.volume = 1;
          document.getElementById(key.note)?.classList.add("active");
          audio.play();
          key.playing = true;
        }
      }
    });
  };

  const keyboardHandlerUp = (
    e: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    if (isPower === false) return null;

    e.stopPropagation();
    PIANOKEY.map((key) => {
      if (key.mapkey == e.key) {
        const audio = document.getElementById(
          `sounds/${key.note}`
        ) as HTMLAudioElement;
        if (sustain) {
          audio.pause();
        }
        document.getElementById(key.note)?.classList.remove("active");
        key.playing = false;
      }
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isPower === true) {
      console.log(e.currentTarget.value);
      const audio = document.getElementById(
        `sounds/${e.currentTarget.value}`
      ) as HTMLAudioElement;
      audio.volume = 1;
      audio.play();
    }
  };

  return (
    <main
      onKeyDown={keyboardHandlerDown}
      onKeyUp={keyboardHandlerUp}
      className="piano"
    >
      <button
        className="btn_power-on"
        onClick={(e) => {
          e.currentTarget.classList.toggle("power-active");
          setPower((e) => (e === false ? true : false));
        }}
      >
        <img src={ImgSrc} />{" "}
      </button>


      {PIANOKEY.map((key) => (
        <audio
          id={`sounds/${key.note}`}
          src={`sounds/${key.note}.ogg`}
        ></audio>
      ))}
      
      <Octave notes={notes} clickHandler={handleClick}></Octave>

      <div className="btn_sustain">
        <p>Pedal Sustain</p>
        <kbd onClick={() => setSustain((e) => (e === false ? true : false))}>
          Click here to activate
        </kbd>{" "}
        or <kbd>Shift</kbd>
        {sustain === false ? (
          <button className="active"></button>
        ) : (
          <button></button>
        )}
      </div>
    </main>
  );
}

export default App;
