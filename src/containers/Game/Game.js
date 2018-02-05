import React, {Component} from 'react';
import Screen from '../../components/Screen/Screen';
import './Game.scss';
import pieces, {getRandomPiece} from './Pieces';
import {addNewPiece} from './GameFuncs';

const getGrid = () => {
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

class Game extends Component {

    state = {
      board: getGrid()
    };

    componentDidMount() {
      let board = addNewPiece(this.state.board);
      this.setState({board});
    }


    render() {
      const {board} = this.state;
      return (<div className="container"><Screen board={board}/></div>);
    }
}

export default Game;
