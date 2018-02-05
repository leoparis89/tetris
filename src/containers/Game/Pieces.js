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

export const getRandomPiece = () => pieces[Math.floor(Math.random() * pieces.length)];

export default pieces;
