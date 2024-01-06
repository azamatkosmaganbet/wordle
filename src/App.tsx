import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import "./App.css";
import { boardDefault } from "./Words";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { generateRandomWord } from "./Words";
import GameOver from "./components/GameOver";
type BoardState = string[][];

interface CurrAttempt {
  attempt: number;
  letterPos: number;
}

interface BoardContext {
  board: BoardState;
  setBoard: (newBoard: BoardState) => void;
  currAttempt: CurrAttempt;
  setCurrAttempt: (newCurrAttempt: CurrAttempt) => void;
  onSelectLetter: (keyVal: string) => void;
  onEnter: () => void;
  onDeleteLetter: () => void;
  setDisabledLetters: (letters: any) => void;
  correctWord: string;
  disabledLetters: string[];
  gameOver: {
    gameOver: boolean;
    guessedWord: boolean;
  };
  setGameOver: React.Dispatch<React.SetStateAction<{
    gameOver: boolean;
    guessedWord: boolean;
  }>>;
}
const correctWord = "HELLO";
export const AppContext = createContext<BoardContext>({
  board: [],
  correctWord: correctWord,
  currAttempt: { attempt: 0, letterPos: 0 },
  setBoard: () => {},
  setCurrAttempt: () => {},
  onSelectLetter: () => {},
  setDisabledLetters: () => {},
  onDeleteLetter: () => {},
  onEnter: () => {},
  disabledLetters: [],
  gameOver: {
    gameOver: false,
    guessedWord: false,
  },
  setGameOver: () => {},
});

function App() {
  const [board, setBoard] = useState<BoardState>(boardDefault);
  const [word, setWord] = useState<Set<string>>(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  const [currAttempt, setCurrAttempt] = useState<CurrAttempt>({
    attempt: 0,
    letterPos: 0,
  });

  useEffect(() => {
    generateRandomWord().then((words) => {
      setWord(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const onSelectLetter = (keyVal: string) => {
    if (currAttempt.letterPos > 4) return;
    const currBoard = [...board];
    currBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(currBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  const onDeleteLetter = () => {
    if (currAttempt.letterPos === 0) return;
    const currBoard = [...board];
    currBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(currBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";

    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (word.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("Слово не найдено");
    }

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    console.log(currAttempt);
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }


  };
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
        <AppContext.Provider
          value={{
            board,
            setBoard,
            currAttempt,
            setCurrAttempt,
            onSelectLetter,
            onEnter,
            correctWord,
            setDisabledLetters,
            onDeleteLetter,
            disabledLetters,
            gameOver,
            setGameOver,
          }}
        >
          <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
          </div>
        </AppContext.Provider>
      </nav>
    </div>
  );
}

export default App;
