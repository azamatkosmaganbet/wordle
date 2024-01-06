/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect } from "react";
import Key from "./Key";
import { AppContext } from "../App";

function Keyboard() {
  const { onDeleteLetter, onEnter, onSelectLetter, disabledLetters } = useContext(AppContext);
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyboard = useCallback((event: KeyboardEvent) => {
    if (event.key === "Enter") {
      onEnter();
    } else if (event.key === "Backspace") {
      onDeleteLetter();
    } else {
      [keys1, keys2, keys3].forEach((keySet) => {
        keySet.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
      });
    }
  }, [keys1, keys2, keys3, onDeleteLetter, onEnter, onSelectLetter]);

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => handleKeyboard(event);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyboard]);

  const handleReactKeyboardEvent: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    handleKeyboard(event as unknown as KeyboardEvent);
  };

  return (
    <div className="keyboard" onKeyDown={handleReactKeyboardEvent}>
      <div className="line1">
        {keys1.map((key) => (
          <Key keyVal={key} disabled={disabledLetters.includes(key)} />
        ))}
      </div>
      <div className="line2">
        {keys2.map((key) => (
          <Key keyVal={key} disabled={disabledLetters.includes(key)}  />
        ))}
      </div>
      <div className="line3">
        <Key keyVal="ENTER" bigKey />
        {keys3.map((key) => (
          <Key keyVal={key} disabled={disabledLetters.includes(key)} />
        ))}
        <Key keyVal="DELETE" bigKey />
      </div>
    </div>
  );
}

export default Keyboard;
