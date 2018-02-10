import React, {Component} from 'react';
import Screen from '../../components/Screen/Screen';
import './Game.scss';
import {getRandomPiece} from './Pieces';
import {BLOCKED, CAN_PLACE, canPlace, getFullLines, getGrid, place, removeCompletedLines, rotate} from './GameFuncs';
import Controller, {DOWN, LEFT, RIGHT, ROTATE_LEFT} from '../../components/Controller/Controller';
import Info from '../../components/Info/Info';

const newBoard = getGrid();

class Game extends Component {
    state = {
      board: newBoard,
      currentBoard: newBoard,
      currentPos: {x: null, y: null},
      currentPiece: null,
      nextPiece: null,
      gameSpeed: 1000,
      intervalId: null, // if there's a number here the game is running
      gameOver: false
    };


    // injectNewPiece = () => this.injectPiece(getRandomPiece());
    injectNewPiece = () => {
      const {nextPiece} = this.state;
      this.injectPiece(nextPiece);
      this.setState({currentPiece: nextPiece, nextPiece: getRandomPiece()});
    };

    /*
     * Injects a piece on the top of the current Board
     */
    injectPiece = (piece) => {
      const {board} = this.state;
      const targetPos = {
        x: Math.floor((board[0].length - piece.length) / 2),
        y: 0
      };
      const result = canPlace(board, piece, targetPos.x, targetPos.y);

      if (result === BLOCKED) {
        this.gameOver();
      } else {
        this.setState({
          currentPiece: piece,
          currentPos: targetPos,
          currentBoard: place(board,piece, targetPos.x, targetPos.y)
        });
      }
    }

    gameOver = () => {
      this.stopFlow();
      this.setState({gameOver: true});
    }

    startNewGame = () => {
      this.resetBoards();
      this.resetPieces().then(
        () => this.injectNewPiece()
      );
      this.startFlow();
    }

    startFlow = () => {
      if (this.state.intervalId) {
        clearInterval(this.state.intervalId);
      }

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

    resetBoards = () => {
      this.setState({
        board: newBoard,
        currentBoard: newBoard,
      });
    }

    resetPieces = () => new Promise(res => this.setState({currentPiece:null, nextPiece: getRandomPiece()}, res()));

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
        const boardWithPiece = place(board, currentPiece, currentPos.x, currentPos.y);

        if (getFullLines(boardWithPiece)) {
          this.stopFlow();
          setTimeout(() => {
            this.updateBoardAndInjectNewPiece(removeCompletedLines(boardWithPiece));
            this.startFlow();
          }, 2000 );

        } else {
          this.updateBoardAndInjectNewPiece(boardWithPiece);
          this.startFlow();
        }
      }
    }

    updateBoardAndInjectNewPiece = board => this.setState({board}, () => this.injectNewPiece());

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
      const {currentBoard, intervalId, gameOver, nextPiece} = this.state;
      return (<div className="container">{currentBoard && <Screen board={currentBoard}/>}
        <Controller sendCommand ={this.handleSendCommand}
          rotate={this.handleRotate}
        />
        <Info nextPiece={nextPiece}/>
        <div>
          <button disabled={intervalId} onClick={this.startNewGame}>START</button>
          <button disabled={!intervalId} onClick={this.stopFlow}>STOP FLOW</button>
          <button disabled={intervalId} onClick={this.startFlow}>START FLOW</button>
          {gameOver && <h1>Game Over</h1>}
        </div>
      </div>);
    }
}

export default Game;
