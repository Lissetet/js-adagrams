import { letterCounts, letterScores } from './gameConstants.js';

export const drawLetters = () => {
  const availablePool = Array.from(
    Object.entries(letterCounts).flatMap(([letter, count]) =>
      Array(count).fill(letter)
    )
  );

  const hand = Array.from({ length: 10 }, () => {
    const randomIndex = Math.floor(Math.random() * availablePool.length);
    const [selectedLetter] = availablePool.splice(randomIndex, 1);
    return selectedLetter;
  });

  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const inputLetters = input.split('');

  for (let letter of inputLetters) {
    if (!lettersInHand.includes(letter)) {
      return false;
    }
    lettersInHand.splice(lettersInHand.indexOf(letter), 1);
  }

  return true;
};

export const scoreWord = (word) => {
  const letters = word.toUpperCase().split('');
  let score = 0;
  for (let letter of letters) {
    score += letterScores[letter];
  }
  if (letters.length >= 7) {
    score += 8;
  }
  return score;
};

export const highestScoreFrom = (words) => {
  let highestScore = 0;
  let highestWord = '';
  for (let word of words) {
    const score = scoreWord(word);
    if (score > highestScore) {
      highestScore = score;
      highestWord = word;
    } else if (score === highestScore) {
      if (word.length === 10 && highestWord.length !== 10) {
        highestWord = word;
      } else if (word.length < highestWord.length && highestWord.length !== 10) {
        highestWord = word;
      }
    }
  }
  return { word: highestWord, score: highestScore };
};
