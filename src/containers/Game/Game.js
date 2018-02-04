import React, {Component} from 'react';
import Screen from '../../components/Screen/Screen';
import './Game.scss';

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
      game: getGrid()
    }

    render() {
      const {game} = this.state;
      return (<div className="container"><Screen game={game}/></div>);
    }
}

export default Game;
