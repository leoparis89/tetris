const pieces = [];

pieces.push([
  [0, 0, 0, 0],
  [1, 1, 1, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]);

pieces.push([
  [0, 0, 1],
  [1, 1, 1],
  [0, 0, 0]
]);

pieces.push([
  [1,1],
  [1,1]
]);

pieces.push([
  [0, 1, 1],
  [1, 1, 0],
  [0, 0, 0]
]);

pieces.push([
  [0, 1, 0],
  [1, 1, 1],
  [0, 0, 0]
]);

pieces.push([
  [1, 1, 0],
  [0, 1, 1],
  [0, 0, 0]
]);

const coloredPieces = pieces.map((piece, i) => piece.map(col => col.map(row => row ? (i + 1) : 0)));

export const getRandomPiece = () => coloredPieces[Math.floor(Math.random() * pieces.length)];

export default pieces;
