import React, {Component} from 'react';
import Screen from '../../components/Screen/Screen';
import './Game.scss';
import {getRandomPiece} from './Pieces';

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
      board: getGrid(),
      currentBoard: null,
      currentPos: {x: 0, y: 0},
      currentPiece: null,
      gameSpeed: 3000

    };

    componentDidMount() {
      this.setNewPiece(getRandomPiece());
      setInterval(() => {
        let {currentPos: {y}} = this.state;
        y++;
        this.setState({currentPos: {y}});
      }, this.state.gameSpeed) ;
    }

    setNewPiece(currentPiece) {
      const {board} = this.state;
      this.setState({
        currentPiece,
        currentPos: {
          x: Math.floor((board[0].length - currentPiece.length) / 2),
          y: 0
        }
      });
    }
    
    updateCurrentBoard() {



    }

    render() {
      const {board} = this.state;
      return (<div className="container"><Screen board={board}/></div>);
    }
}

export default Game;
