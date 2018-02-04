const CAN_PLACE = 'CAN_PLACE';
const BLOCKED = 'BLOCKED';
const OFFSCREEN = 'OFFSCREEN';

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
