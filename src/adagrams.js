import { letterCounts, letterScores } from './gameConstants.js';

export class Adagrams {
  constructor() {
    this.letterCounts = letterCounts;
    this.letterScores = letterScores;
  }

  drawLetters() {
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
  }
}

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
  let score = letters.reduce((sum, letter) => sum + (letterScores[letter] || 0), 0);
  score = letters.length >= 7 ? score + 8 : score;
  return score;
};

export const highestScoreFrom = (words) => {
  const scores = words.map ((word) => {
    return {
      score: scoreWord(word),
      word: word,
    };
  });
  const highestScore = Math.max(...scores.map(obj => obj.score));
  const highestScores = scores.filter(obj => obj.score === highestScore);

  if (highestScores.length === 1) {
    return highestScores[0];
  }

  if (highestScores.some(obj => obj.word.length === 10)) {
    return highestScores.find(obj => obj.word.length === 10);
  } else {
    const shortestWord = Math.min(...highestScores.map(obj => obj.word.length));
    return highestScores.find(obj => obj.word.length === shortestWord);
  }
};
