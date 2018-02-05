import {canPlace, place, removeCompletedLines, rotate} from './GameFuncs';

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

test('removeCompletedLines should clean out completed lines', () => {
  let board = [
    [0,0,0,0],
    [1,0,2,0],
    [1,1,1,1],
    [2,0,1,2],
  ];


  let expected = [
    [0,0,0,0],
    [0,0,0,0],
    [1,0,2,0],
    [2,0,1,2],
  ];

  expect(removeCompletedLines(board)).toEqual(expected);

  board = [
    [0,1,0,0],
    [1,1,1,1],
    [1,1,1,1],
    [2,0,1,2],
  ];


  expected = [
    [0,0,0,0],
    [0,0,0,0],
    [0,1,0,0],
    [2,0,1,2],
  ];

  expect(removeCompletedLines(board)).toEqual(expected);

  board = [
    [1,1,1,1],
    [1,1,1,1],
    [1,1,1,1],
    [2,0,1,2],
  ];

  expected = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [2,0,1,2],
  ];

  expect(removeCompletedLines(board)).toEqual(expected);
});

test('place should return a board with the printed piece', () => {
  let board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
  ];

  let piece = [
    [0, 0, 0],
    [1, 1, 9],
    [0, 0, 1]
  ];

  let expected = [
    [0,0,0,0],
    [0,1,1,9],
    [0,0,0,1],
    [0,0,0,0],
  ];

  expect(place(board, piece, 1, 0)).toEqual(expected);
  board = [
    [0,0,0,0],
    [0,0,0,4],
    [0,0,0,0],
    [0,0,1,2],
  ];

  piece = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1]
  ];

  expected = [
    [0,0,0,0],
    [0,0,0,4],
    [0,1,1,1],
    [0,0,1,1],
  ];

  expect(place(board, piece, 1, 1)).toEqual(expected);
});

test('rotate should rotate the pice corectly', () => {


  // x' = y
  // y' = dim - x

  let piece = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1]
  ];

  let expected = [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0]
  ];

  expect(rotate(piece, true)).toEqual(expected);

  piece = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1]
  ];

  expected = [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
  ];

  expect(rotate(piece, false)).toEqual(expected);
});
