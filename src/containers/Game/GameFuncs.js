import {getRandomPiece} from './Pieces';

export const CAN_PLACE = 'CAN_PLACE';
export const BLOCKED = 'BLOCKED';
export const OFFSCREEN = 'OFFSCREEN';

export const canPlace = (board, piece, x, y) => {
  const dim = piece.length;
  const boardHeight = board.length;
  const boardWidth = board[0].length;

  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      if (piece[j][i]) {
        let targetX = i + x;
        let targetY = j + y;

        if (targetX < 0 || targetX > (boardWidth -1) ) {
          return OFFSCREEN;
        }

        if (board[targetY] && board[targetY][targetX] || targetY > boardHeight - 1) {
          return BLOCKED;
        }
      }
    }
  }

  return CAN_PLACE;
};

export const removeCompletedLines = (board) => {
  const result = clone2dArray(board);
  const boardHeight = board.length;
  const boardWidth = board[0].length;

  for (let j = boardHeight - 1; j >= 0; j--) {
    let fullLine = true;
    for (let i = 0; i < boardWidth - 1; i++) {
      if (result[j][i] === 0) {
        fullLine = false;
      }
    }

    if (fullLine) {
      result.splice(j, 1);
      const newLine = [];
      for (let i = 0; i < boardWidth; i++) {
        newLine.push(0);
      }
      result.unshift(newLine);
      j++;
    }
  }

  return result;
};

export const place = (board, piece, x, y) => {
  const pieceWidth = piece.length;
  const result = clone2dArray(board);

  for (let i = 0; i < pieceWidth; i++) {
    for (let j = 0; j < pieceWidth; j++) {
      if (piece[j][i]) {
        result[y + j][x + i] = piece[j][i];
      }
    }
  }

  return result;
};

export const rotate = (piece, left) => {
  const pieceWidth = piece.length;
  const result = clone2dArray(piece);

  for (let i = 0; i < pieceWidth; ++i) {
    for (let j = 0; j < pieceWidth; ++j) {

      if (left) {
        result[pieceWidth - 1 -i][j] = piece[j][i];
      } else {
        result[i][pieceWidth - 1 - j] = piece[j][i];
      }

    }
  }

  return result;
};

export const addNewPiece = (board) => {
  const result = clone2dArray(board);
  let piece = getRandomPiece();
  const horizAxis = Math.floor((result[0].length - piece.length) / 2);
  return canPlace(result, piece, horizAxis, 0) === 'BLOCKED' ?
    false : place(result, piece, horizAxis, 0);
};

export const clone2dArray = arr => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result[i] = arr[i].slice();
  }
  return result;
};

export const getGrid = () => {
  const width = 10;
  const height = 22;
  const grid = [];

  for (let i = 0; i < height; i++) {
    grid[i] = [];
    for (let j = 0; j < width; j++) {
      grid[i][j] = 0;
    }
  }

  return grid;
};
