const LETTER_POOL = {
  A: 9,
  B: 2,
  C: 2,
  D: 4,
  E: 12,
  F: 2,
  G: 3,
  H: 2,
  I: 9,
  J: 1,
  K: 1,
  L: 4,
  M: 2,
  N: 6,
  O: 8,
  P: 2,
  Q: 1,
  R: 6,
  S: 4,
  T: 6,
  U: 4,
  V: 2,
  W: 2,
  X: 1,
  Y: 2,
  Z: 1,
};

const SCORE_CHART = {
  A: 1,
  E: 1,
  I: 1,
  O: 1,
  U: 1,
  L: 1,
  N: 1,
  R: 1,
  S: 1,
  T: 1,
  D: 2,
  G: 2,
  B: 3,
  C: 3,
  M: 3,
  P: 3,
  F: 4,
  H: 4,
  V: 4,
  W: 4,
  Y: 4,
  K: 5,
  J: 8,
  X: 8,
  Q: 10,
  Z: 10,
};

export const drawLetters = () => {
  const pool = [];
  Object.entries(LETTER_POOL).forEach(([letter, freq]) => {
    for (let count = 0; count < freq; count++) {
      pool.push(letter);
    }
  });

  const hand = [];
  const poolCopy = pool.slice();
  for (let handCount = 0; handCount < 10; handCount++) {
    const idx = Math.floor(Math.random() * poolCopy.length);
    hand.push(poolCopy[idx]);
    poolCopy.splice(idx, 1);
  }
  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  if (!input) return true;
  const handCounts = {};
  for (const letter of lettersInHand) {
    handCounts[letter] = (handCounts[letter] || 0) + 1;
  }

  const upper = input.toUpperCase();
  for (const char of upper) {
    if (!handCounts[char]) {
      return false;
    }
    handCounts[char] -= 1;
  }
  return true;
};

export const scoreWord = (word) => {
  if (!word) return 0;
  const upper = word.toUpperCase();
  let score = 0;
  for (const char of upper) {
    score += SCORE_CHART[char] || 0;
  }
  if (upper.length >= 7) score += 8;
  return score;
};

export const highestScoreFrom = (words) => {
  let best = { word: '', score: 0 };

  for (const word of words) {
    const score = scoreWord(word);

    if (score > best.score) {
      best = { word, score };
    } else if (score === best.score) {
      const currentLen = word.length;
      const bestLen = best.word.length;

      if (currentLen === 10 && bestLen !== 10) {
        best = { word, score };
      } else if (!(bestLen === 10 && currentLen !== 10)) {
        if (currentLen < bestLen) {
          best = { word, score };
        }
      }
    }
  }

  return best;
};
