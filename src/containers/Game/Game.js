import React, {Component} from 'react';
import Screen from '../../components/Screen/Screen';
import './Game.scss';
import {getRandomPiece} from './Pieces';
import {BLOCKED, CAN_PLACE, canPlace, getGrid, place, rotate} from './GameFuncs';
import Controller, {DOWN, LEFT, RIGHT, ROTATE_LEFT} from '../../components/Controller/Controller';

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
    }

    newPiece = (newPiece) => {
      const {board} = this.state;
      const targetPos = {
        x: Math.floor((board[0].length - newPiece.length) / 2),
        y: 0
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
      this.stopFlow();
    }

    startNewGame = () => {
      this.resetGame();
      this.newPiece(getRandomPiece());
      this.startFlow();
    }

    startFlow = () => {
      this.setState({intervalId: setInterval(()=> {
        this.move(DOWN);
      }, this.state.gameSpeed)
      });
    }

    stopFlow = () => {
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
        break;
      }

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
          this.newPiece(getRandomPiece());
        });
      }
    }

    handleSendCommand = (direction) => {
      this.move(direction);
    }

    handleRotate = (direction) => {
      const {board, currentPiece, currentPos: {x, y}} = this.state;
      const rotatedPiece = rotate(currentPiece, direction === ROTATE_LEFT);
      const result = canPlace(board, currentPiece, x, y);

      if (result === CAN_PLACE) {
        this.setState({
          currentBoard: place(board, rotatedPiece, x, y),
          currentPiece: rotatedPiece
        });
      }
    }

    render() {
      const {board, currentBoard} = this.state;
      return (<div className="container">{currentBoard && <Screen board={currentBoard}/>}
        <Controller sendCommand ={this.handleSendCommand}
          rotate={this.handleRotate}
        />
        <div>
          <button onClick={this.startNewGame}>START</button>
          <button onClick={this.resetGame}>RESET</button>
          <button onClick={this.stopFlow}>STOP FLOW</button>
          <button onClick={this.startFlow}>START FLOW</button>
        </div>
      </div>);
    }
}

export default Game;
