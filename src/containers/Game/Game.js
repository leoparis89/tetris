import React, {Component} from 'react';
import Screen from '../../components/Screen/Screen';
import './Game.scss';
import {getRandomPiece} from './Pieces';
import {BLOCKED, CAN_PLACE, canPlace, getGrid, place} from './GameFuncs';
import Controller, {DOWN, LEFT, RIGHT, UP} from '../../components/Controller/Controller';

const newGrid = getGrid();

class Game extends Component {
    state = {
      board: newGrid,
      currentBoard: newGrid,
      currentPos: {x: null, y: null},
      currentPiece: null,
      gameSpeed: 1000,
      intervalId: null // if there's a number here the game is running
    };

    componentDidMount() {
      // this.setNewPiece(getRandomPiece());
      // setInterval(() => {
      //   let {currentPos: {y}} = this.state;
      // y++;
      // }, this.state.gameSpeed) ;
    }

    newPiece = () => {
      const {board} = this.state;
      const newPiece = getRandomPiece();
      const targetPos = {
        x: 0,
        y: Math.floor((board[0].length - newPiece.length) / 2)
      };
      const result = canPlace(board, newPiece, targetPos.x, targetPos.y);

      if (result === BLOCKED) {
        this.gameOver();
      } else {
        this.setState({
          currentPiece: newPiece,
          currentPos: targetPos,
          currentBoard: place(board,newPiece, targetPos.x, targetPos.y)
        });
      }
    }

    gameOver = () => {
    }

    startNewGame = () => {
      this.resetGame();
      this.newPiece();

      this.setState({intervalId: setInterval(()=> {
        this.move(DOWN);
        console.log('BAR');
      }, this.state.gameSpeed)
      });
    }

    stopGame() {
      clearInterval(this.state.intervalId);
      this.setState({
        intervalId: null
      });
    }

    resetGame = () => {
      const newBoard = getGrid();
      this.setState({
        board: newBoard,
        currentBoard: newBoard,
        currentPos: {x: null, y: null},
        currentPiece: null,
      });
    }

    move = (direction) => {
      const {board, currentPiece, currentPos, intervalId} = this.state;
      // do nothing if no game is in progress
      if (!intervalId) return;

      const targetPos = {...currentPos};
      switch (direction) {
      case DOWN:
        targetPos.y++;
        break;
      case LEFT:
        targetPos.x--;
        break;
      case RIGHT:
        targetPos.x++;
      }
      console.log('target x', targetPos.y);

      const result = canPlace(board, currentPiece, targetPos.x ,targetPos.y);
      if (result === CAN_PLACE) {
        this.setState({
          currentBoard: place(board, currentPiece, targetPos.x, targetPos.y),
          currentPos: targetPos
        });
      }

      if (result === BLOCKED && direction === DOWN) {
        this.setState({
          board: place(board, currentPiece, currentPos.x, currentPos.y)
        }, () => {
          // add new piece
        });
      }
    }

    handleSendCommand = (direction) => {
      this.move(direction);
    }


    render() {
      const {board, currentBoard} = this.state;
      return (<div className="container">{currentBoard && <Screen board={currentBoard}/>}
        <Controller sendCommand ={this.handleSendCommand}/>
        <div>
          <button onClick={this.startNewGame}>START</button>
          <button onClick={this.resetGame}>RESET</button>
        </div>
      </div>);
    }
}

export default Game;
