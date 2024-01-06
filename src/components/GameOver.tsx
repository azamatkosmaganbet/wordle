import { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  const {
    board,
    setBoard,
    currAttempt,
    gameOver,
    onSelectLetter,
    correctWord,
    onDeleteLetter,
  } = useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>
        {gameOver.guessedWord
          ? "Поздравляем, Вы угадали слово"
          : "Упс, попробуйте еще раз"}
      </h3>
      <h1>Слово: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3>Вы угадали за {currAttempt.attempt} попыток</h3>
      )}
    </div>
  );
}

export default GameOver;
