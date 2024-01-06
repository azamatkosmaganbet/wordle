import wordBank from "./words.txt";

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateRandomWord = async () => {
  let wordSet = new Set<string>();
  let todaysWord = "";
  await fetch(wordBank)
    .then((response) => response.text())
    .then((text) => {
      const wordArr = text.split("\n").map(word => word.trim().replace(/\r/g, ""));
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordSet = new Set(wordArr);
    });

  return { wordSet, todaysWord  };
};
