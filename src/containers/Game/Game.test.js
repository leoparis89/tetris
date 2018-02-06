import {shallow} from 'enzyme';
import {configure} from 'enzyme';
import Game from './Game';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {getGrid} from './GameFuncs';

configure({adapter: new Adapter()});

test('start flow should set correct state', () => {
  const wrapper = shallow(<Game />);
  wrapper.instance().startFlow();
  const {intervalId} = wrapper.instance().state;
  expect(typeof intervalId).toEqual('number');
});

test('stop flow should set correct state', () => {
  const wrapper = shallow(<Game />);
  wrapper.instance().stopFlow();
  const {intervalId} = wrapper.instance().state;
  expect(intervalId).toEqual(null);
});

test('reset game should set state correctly', () => {
  const wrapper = shallow(<Game />);
  wrapper.instance().setState({
    board: [],
    currentBoard: [],
    currentPos: {x: 4, y: 8},
    currentPiece: [],
    gameSpeed: 40,
    intervalId: 4
  });

  wrapper.instance().resetGame();
  const board = getGrid();

  const expected = {
    board: board,
    currentBoard: board,
    currentPos: {x: null, y: null},
    currentPiece: null,
    gameSpeed: 40,
    intervalId: 4
  };

  expect(wrapper.instance().state).toEqual(expected);
});

test('new piece should add piece to currentBoard if possible', () => {
  const board = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,1,0]
  ];

  const newPiece = [
    [0,0,1],
    [0,0,1],
    [0,1,1]
  ];

  const expected = [
    [0,0,0,1,0],
    [0,0,0,1,0],
    [0,0,1,1,0],
    [0,0,0,1,0]
  ];


  const wrapper = shallow(<Game />);
  wrapper.setState({
    board
  });

  wrapper.instance().newPiece(newPiece);

  expect(wrapper.instance().state.currentBoard).toEqual(expected);
});

test('new piece should call game over is the new piece is blocked', () => {
  const board = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,1,0],
    [0,0,0,1,0]
  ];

  const newPiece = [
    [0,0,1],
    [0,0,1],
    [0,1,1]
  ];

  const wrapper = shallow(<Game />);
  wrapper.setState({
    board
  });

  const spy = jest.spyOn(wrapper.instance(), 'gameOver');
  wrapper.instance().newPiece(newPiece);
  expect(spy).toHaveBeenCalled();
});

test('move piece should update current board with new position if there is romm', () => {
  const board = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ];

  const currentPiece = [
    [0,0,1],
    [0,0,1],
    [0,1,1]
  ];

  const expected = [
    [0,0,0,1,0],
    [0,0,0,1,0],
    [0,0,1,1,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ];

  const wrapper = shallow(<Game />);
  wrapper.setState({
    board,
    currentPiece,
    currentPos: {x:0, y:0},
    intervalId: 4
  });

  wrapper.instance().move('RIGHT');
  expect(wrapper.instance().state.currentBoard).toEqual(expected);
});

test('move piece should not do anything if piece flow is not ongoing', () => {
  const wrapper = shallow(<Game />);

  wrapper.instance().move('RIGHT');
  expect(wrapper.instance().state.currentBoard).toEqual(getGrid());
});

test('move piece should print current piece in board and generate a new one if current piece is blocked movings down', () =>{
  const board = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ];

  const currentPiece = [
    [0,0,1],
    [0,0,1],
    [0,1,1]
  ];

  const expected = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,1,1,0,0]
  ];

  const wrapper = shallow(<Game />);
  wrapper.setState({
    board,
    currentPiece,
    currentPos: {x:0, y:3},
    intervalId: 4
  });

  const spy = jest.spyOn(wrapper.instance(), 'newPiece');
  wrapper.instance().move('DOWN');
  expect(wrapper.instance().state.board).toEqual(expected);
  expect(spy).toHaveBeenCalled();
});
