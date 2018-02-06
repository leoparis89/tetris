import {shallow} from 'enzyme';
import {configure} from 'enzyme';
import Game from './Game';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {getGrid} from './GameFuncs';

configure({adapter: new Adapter()});

test('start game should set correct state', () => {
  const wrapper = shallow(<Game />);
  wrapper.instance().startGame();
  const {intervalId} = wrapper.instance().state;
  expect(typeof intervalId).toEqual('number');
});

test('stop game should set correct state', () => {
  const wrapper = shallow(<Game />);
  wrapper.instance().stopGame();
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
