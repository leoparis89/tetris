import {shallow} from 'enzyme';
import {configure} from 'enzyme';
import Game from './Game';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {getGrid} from './GameFuncs';

configure({adapter: new Adapter()});


describe('flow',() => {
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
});

describe('resets',() => {
  test('resetBoards should set state correctly', () => {
    const wrapper = shallow(<Game />);
    wrapper.instance().setState({
      board: [],
      currentBoard: [],
      currentPos: {x: 4, y: 8},
      currentPiece: [],
      nextPiece: [],
      gameSpeed: 40,
      intervalId: 4,
      gameOver: true,
    });

    wrapper.instance().resetBoards();
    const board = getGrid();

    const expected = {
      board: board,
      currentBoard: board,
      currentPos: {x: 4, y: 8},
      currentPiece: [],
      nextPiece: [],
      gameSpeed: 40,
      intervalId: 4,
      gameOver: true,
      score: 0,
      level: 1,
      lines: 0,
      effects: false
    };

    expect(wrapper.instance().state).toEqual(expected);
  });

  test('reset pieces should set state correctly', () => {
    const wrapper = shallow(<Game />);

    wrapper.setState({
      currentPiece: [],
      nextPiece: []
    });

    wrapper.instance().resetPieces();
    const {nextPiece, currentPiece} = wrapper.instance().state;

    expect(currentPiece).toBe(null);
    expect(nextPiece.length).not.toBe(0);
  });
});

describe('injectPiece', () => {
  test('inject piece should add piece to currentBoard at start position if possible', () => {
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

    wrapper.instance().injectPiece(newPiece);

    expect(wrapper.instance().state.currentBoard).toEqual(expected);
  });

  test('inject piece should put piece as current piece', () => {
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

    wrapper.instance().injectPiece(newPiece);

    expect(wrapper.instance().state.currentPiece).toEqual(newPiece);
  });

  test('inject piece should call game over is injected piece is blocked', () => {
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
    wrapper.instance().injectPiece(newPiece);
    expect(spy).toHaveBeenCalled();
  });
});

describe('Inject new piece', () => {
  test('it should not inject nextPiece if nextPiece is null', () => {
    const wrapper = shallow(<Game />);
    wrapper.setState({
      nextPiece: null
    });

    wrapper.instance().injectNextPiece();
    const spy = jest.spyOn(wrapper.instance(), 'injectPiece');
    expect(spy).not.toHaveBeenCalled();
  });

  test('it should inject nextPiece in currentBoard', () => {
    const piece = [
      [0,0,1],
      [0,0,1],
      [0,1,1]
    ];

    const wrapper = shallow(<Game />);

    wrapper.setState({
      nextPiece: piece
    });

    const spy = jest.spyOn(wrapper.instance(), 'injectPiece');

    wrapper.instance().injectNextPiece();
    expect(spy).toHaveBeenCalledWith(piece);
  });

  test('it should generate a new nextPiece', () => {
    const wrapper = shallow(<Game />);

    wrapper.setState({
      nextPiece: []
    });


    wrapper.instance().injectNextPiece();
    expect(wrapper.instance().state.nextPiece.length).not.toBe(0);
  });
});

describe('Handle move', () => {
  test('it shouldnt call move if flow isnt ongoin', () => {
    const instance = shallow(<Game />).instance();
    const spy = jest.fn();
    instance.move = spy;
    instance.handleMove('RIGHT');
    expect(spy).not.toHaveBeenCalled();
  });

  test('it should call move if flow is ongoin', () => {
    const instance = shallow(<Game />).instance();
    instance.setState({intervalId: 5});
    const spy = jest.fn();
    instance.move = spy;
    instance.handleMove('RIGHT');
    expect(spy).toHaveBeenCalledWith('RIGHT');
  });
});

describe('Move piece', () => {
  test('move piece should update current board with new position if there is room', () => {
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

  test('move piece should print current piece in board if it is blocked moving down', () =>{
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

    wrapper.instance().move('DOWN');
    expect(wrapper.instance().state.board).toEqual(expected);
  });
});

describe('componentDidUpdate', () => {
  test('a new piece should be injected when board changes', () => {
    const wrapper = shallow(<Game />);
    const spy = jest.spyOn(wrapper.instance(), 'injectNextPiece');

    wrapper.instance().setState({board: ['new']});
    wrapper.instance().componentDidUpdate({}, {board: ['olc']});

    expect(spy).toHaveBeenCalled();
  });

  test('level should be updated when score goes over threshold', () => {
    const wrapper = shallow(<Game />);
    wrapper.instance().setState({score: 101, level: 1});
    wrapper.instance().componentDidUpdate({}, {score: 99});

    expect(wrapper.instance().state.level).toEqual(2);

    wrapper.instance().setState({score: 150});
    wrapper.instance().componentDidUpdate({}, {score: 101});

    expect(wrapper.instance().state.level).toEqual(2);

    wrapper.instance().setState({score: 200});
    wrapper.instance().componentDidUpdate({}, {score: 150});

    expect(wrapper.instance().state.level).toEqual(3);
  });
});

describe('Game over', () => {
  test('it should stop flow', () => {
    const wrapper = shallow(<Game />);
    const instance = wrapper.instance();
    const spy = jest.spyOn(wrapper.instance(), 'stopFlow');
    instance.gameOver();
    expect(spy).toHaveBeenCalled();
  });
});
