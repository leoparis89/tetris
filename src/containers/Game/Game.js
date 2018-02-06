import React, {Component} from 'react';
import Screen from '../../components/Screen/Screen';
import './Game.scss';
import {getRandomPiece} from './Pieces';
import {canPlace, getGrid} from './GameFuncs';


class Game extends Component {
    state = {
      board: getGrid(),
      currentBoard: null,
      currentPos: {x: null, y: null},
      currentPiece: null,
      gameSpeed: 3000,
      intervalId: null // if there's a number here the game is running
    };

    componentDidMount() {
      this.setNewPiece(getRandomPiece());
      setInterval(() => {
        let {currentPos: {y}} = this.state;
        y++;
      }, this.state.gameSpeed) ;
    }

    setNewPiece(currentPiece) {
      const {board, currentPos} = this.state;
    }

    startGame() {
      this.setState({intervalId: setInterval(()=> {
        
      }, this.state.gameSpeed)
      });
    }

    stopGame() {
      clearInterval(this.state.intervalId);
      this.setState({
        intervalId: null
      });
    }

    resetGame() {
      this.setState({
        board: getGrid(),
        currentBoard: null,
        currentPos: {x: null, y: null},
        currentPiece: null,
      });
    }

    handleMove(piece, x, y) {
      const {board} = this.state;
      const result = canPlace(board, piece, x ,y);
    }
    
    updateCurrentBoard() {
    }

    render() {
      const {board} = this.state;
      return (<div className="container"><Screen board={board}/></div>);
    }
}

export default Game;
