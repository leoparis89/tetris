import {shallow} from 'enzyme';
import {configure} from 'enzyme';
import Game from './Game';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {getGrid} from './GameFuncs';

configure({adapter: new Adapter()});


describe('flow', () => {
  test('start flow should set correct state', () => {
    const wrapper = shallow(<Game/>);
    wrapper.instance().startFlow();
    const {intervalId} = wrapper.instance().state;
    expect(typeof intervalId).toEqual('number');
  });

  test('stop flow should set correct state', () => {
    const wrapper = shallow(<Game/>);
    wrapper.instance().stopFlow();
    const {intervalId} = wrapper.instance().state;
    expect(intervalId).toEqual(null);
  });
});

describe('reset', () => {
  test('reset should set state correctly', () => {
    const instance = shallow(<Game/>).instance();
    instance.setState({
      board: [],
      currentBoard: [],
      currentPos: {x: 4, y: 8},
      currentPiece: [],
      nextPiece: [],
      gameSpeed: 40,
      intervalId: 4,
      gameOver: true,
    });

    instance.reset();
    const {board, currentBoard, currentPiece, nextPiece, currentPos, level, score, lines} = instance.state;
    const expected = {
      board: getGrid(),
      currentBoard: getGrid(),
      currentPiece: null,
      currentPos: null,
      level: 1,
      score: 0,
      lines: 0
    };

    expect({board, currentBoard, currentPiece, currentPos, level, score, lines}).toEqual(expected);
    expect(nextPiece.length).toBeGreaterThan(1);
  });
});

describe('injectPiece', () => {
  test('inject piece should add piece to currentBoard at start position', () => {
    const board = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0]
    ];

    const newPiece = [
      [0, 0, 1],
      [0, 0, 1],
      [0, 1, 1]
    ];

    const expected = [
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 1, 0]
    ];


    const wrapper = shallow(<Game/>);
    wrapper.setState({
      board
    });

    wrapper.instance().injectPiece(newPiece);

    expect(wrapper.instance().state.currentBoard).toEqual(expected);
  });

  test('inject piece should set piece passed as argurment as current piece', () => {
    const board = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0]
    ];

    const newPiece = [
      [0, 0, 1],
      [0, 0, 1],
      [0, 1, 1]
    ];

    const expected = [
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 1, 0]
    ];


    const wrapper = shallow(<Game/>);
    wrapper.setState({
      board
    });

    wrapper.instance().injectPiece(newPiece);

    expect(wrapper.instance().state.currentPiece).toEqual(newPiece);
  });

  test('inject piece should call game over is injected piece is blocked', () => {
    const board = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0]
    ];

    const newPiece = [
      [0, 0, 1],
      [0, 0, 1],
      [0, 1, 1]
    ];

    const wrapper = shallow(<Game/>);
    wrapper.setState({
      board
    });

    const spy = jest.spyOn(wrapper.instance(), 'gameOver');
    wrapper.instance().injectPiece(newPiece);
    expect(spy).toHaveBeenCalled();
  });

  test('it should generate a new nextPiece', () => {
    const wrapper = shallow(<Game/>);

    wrapper.setState({
      nextPiece: []
    });

    wrapper.instance().injectPiece('bar');
    expect(wrapper.instance().state.nextPiece.length).not.toBe(0);
  });
});

describe('Inject next piece', () => {
  test('it should not inject nextPiece if nextPiece is null', () => {
    const wrapper = shallow(<Game/>);
    wrapper.setState({
      nextPiece: null
    });

    wrapper.instance().injectNextPiece();
    const spy = jest.spyOn(wrapper.instance(), 'injectPiece');
    expect(spy).not.toHaveBeenCalled();
  });

  test('it should inject nextPiece in currentBoard', () => {
    const piece = [
      [0, 0, 1],
      [0, 0, 1],
      [0, 1, 1]
    ];

    const wrapper = shallow(<Game/>);

    wrapper.setState({
      nextPiece: piece
    });

    const spy = jest.spyOn(wrapper.instance(), 'injectPiece');

    wrapper.instance().injectNextPiece();
    expect(spy).toHaveBeenCalledWith(piece);
  });


});

describe('Handle move', () => {
  test('it shouldnt call move if flow isnt ongoin', () => {
    const instance = shallow(<Game/>).instance();
    const spy = jest.fn();
    instance.move = spy;
    instance.handleMove('RIGHT');
    expect(spy).not.toHaveBeenCalled();
  });

  test('it should call move if flow is ongoin', () => {
    const instance = shallow(<Game/>).instance();
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
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];

    const currentPiece = [
      [0, 0, 1],
      [0, 0, 1],
      [0, 1, 1]
    ];

    const expected = [
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];

    const wrapper = shallow(<Game/>);
    wrapper.setState({
      board,
      currentPiece,
      currentPos: {x: 0, y: 0},
      intervalId: 4
    });

    wrapper.instance().move('RIGHT');
    expect(wrapper.instance().state.currentBoard).toEqual(expected);
  });

  test('move piece should print current piece in board if it is blocked moving down', () => {
    const board = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];

    const currentPiece = [
      [0, 0, 1],
      [0, 0, 1],
      [0, 1, 1]
    ];

    const expected = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 1, 0, 0]
    ];

    const wrapper = shallow(<Game/>);
    wrapper.setState({
      board,
      currentPiece,
      currentPos: {x: 0, y: 3},
      intervalId: 4
    });

    wrapper.instance().move('DOWN');
    expect(wrapper.instance().state.board).toEqual(expected);
  });
});

describe('componentDidUpdate', () => {
  test('a new piece should be injected when board changes', () => {
    const wrapper = shallow(<Game/>);
    const spy = jest.spyOn(wrapper.instance(), 'injectNextPiece');

    wrapper.instance().setState({board: ['new']});
    wrapper.instance().componentDidUpdate({}, {board: ['olc']});

    expect(spy).toHaveBeenCalled();
  });

  test('level should be updated when score goes over threshold', () => {
    const wrapper = shallow(<Game/>);
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
    const wrapper = shallow(<Game/>);
    const instance = wrapper.instance();
    const spy = jest.spyOn(wrapper.instance(), 'stopFlow');
    instance.gameOver();
    expect(spy).toHaveBeenCalled();
  });
});


describe('handle new board', () => {
  test('it should do the dance if new board has full lines', () => {
    const instance = shallow(<Game/>).instance();
    instance.setState({nextPiece: 'bar'});
    jest.useFakeTimers();
    const boardWithFullLines = [
      [1, 1, 1],
      [2, 3, 5]
    ];

    const spyStopFlow = jest.fn();
    const spyStartFlow = jest.fn();
    instance.stopFlow = spyStopFlow;
    instance.startFlow = spyStartFlow;

    instance.handleNewBoard(boardWithFullLines);
    // flow should stop and effects are set to true
    expect(spyStopFlow).toHaveBeenCalled();
    expect(instance.state.effects).toEqual(true);
    expect(spyStartFlow).not.toHaveBeenCalled();

    // and after 2 seconds we want this to happen
    jest.runAllTimers();
    expect(spyStartFlow).toHaveBeenCalled();
    const {effects, lines, score} = instance.state;
    const expectedState = {
      effects: false,
      lines: 2,
      score: 20
    };

    expect({effects, lines, score}).toEqual(expectedState);
  });
});

describe('toggle flow', () => {
  test('it should toggle flow', () => {
    const wrapper = shallow(<Game/>);
    const instance = wrapper.instance();
    instance.setState({intervalId: 6});
    const stopFlowSpy = jest.spyOn(instance, 'stopFlow');
    instance.toggleFlow();
    expect(stopFlowSpy).toHaveBeenCalled();

    instance.setState({intervalId: null});
    const startFlowSpy = jest.spyOn(instance, 'startFlow');
    instance.toggleFlow();
    expect(startFlowSpy).toHaveBeenCalled();
  });
});
