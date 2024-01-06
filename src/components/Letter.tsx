import React, { FC, useContext, useEffect } from "react";
import { AppContext } from "../App";
interface LetterProps {
  letterPos: number;
  attemptVal: number;
}

const Letter: FC<LetterProps> = ({ letterPos, attemptVal }) => {
  const { board, correctWord, currAttempt, setDisabledLetters, disabledLetters } = useContext(AppContext);
  
  const letter = board[attemptVal][letterPos];
  
  const correct = correctWord[letterPos] === letter;
  const almost = (!correct && letter !== "" && correctWord.includes(letter));

  const letterState = currAttempt.attempt > attemptVal ? (correct ? "correct" : almost ? "almost" : "error") : "";

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      console.log(letter);
      setDisabledLetters((prev: any) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);

  return <div className="letter" id={letterState}>{letter}</div>;
};

export default Letter;
