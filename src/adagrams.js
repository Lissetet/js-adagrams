import { letterCounts, letterScores } from './gameConstants.js';

export const drawLetters = () => {
  const availablePool = [];
  for (let letter in letterCounts) {
    for (let i = 0; i < letterCounts[letter]; i++) {
      availablePool.push(letter);
    }
  }

  const hand = [];
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * availablePool.length);
    hand.push(availablePool[randomIndex]);
    availablePool.splice(randomIndex, 1);
  }
  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const inputLetters = input.split('');
  for (let letter of inputLetters) {
    if (lettersInHand.includes(letter)) {
      lettersInHand.splice(lettersInHand.indexOf(letter), 1);
    } else {
      return false;
    }
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
  // Implement this method for wave 4
};
