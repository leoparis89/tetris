import {canPlace} from './GameFuncs';

test('canPlace should return CAN_PLACE if move is possible', () => {

  const board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [2,2,0,0],
  ];

  const piece = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1]
  ];

  expect(canPlace(board,piece,0,1)).toEqual('CAN_PLACE');
});

test('canPlace should return OFFSCREEN if piece is out of bouds', () => {

  const board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [2,3,1,1],
  ];

  const piece = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1]
  ];

  expect(canPlace(board, piece, 2, 0)).toBe('OFFSCREEN');
  expect(canPlace(board, piece, -1, 0)).toBe('OFFSCREEN');
});

test('canPlace should return BLOCKED if piece hits bottom', () => {

  let board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,1,1,1],
  ];

  const piece = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1]
  ];
  expect(canPlace(board, piece, 0, 1)).toBe('BLOCKED');

  board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
  ];

  expect(canPlace(board, piece, 0, 2)).toBe('BLOCKED');
});
