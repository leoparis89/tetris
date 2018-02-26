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
      board: newBoard.slice(),
      currentBoard: newBoard.slice(),
      currentPos: {x: null, y: null},
      currentPiece: null,
      nextPiece: null,
      gameSpeed: 1000,
      intervalId: null, // if there's a number here the game is running
      gameOver: false,
      level: 1,
      score: 0,
      lines: 0,
      effects: false
    };


    injectNextPiece = () => {
      const {nextPiece} = this.state;
      if (!nextPiece) return;
      this.injectPiece(nextPiece);
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
        this.startFlow();
        this.setState({
          nextPiece: getRandomPiece(),
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
      this.setState({gameOver: false});
      this.reset();
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

    reset = () => {
      this.setState({
        board: newBoard.slice(),
        currentBoard: newBoard.slice(),
        currentPiece:null,
        nextPiece: getRandomPiece(),
        currentPos: null
      });
    }

    move = direction => {
      const {board, currentPiece, currentPos, gameOver} = this.state;
      // do nothing if no game is in progress
      if (gameOver) return;

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
        this.handleNewBoard(boardWithPiece);
      }
    }

    handleNewBoard(board) {
      if (getFullLines(board)) {
        this.stopFlow();
        this.setState({effects: true});
        setTimeout(() => {
          this.setState({board: removeCompletedLines(board),
            effects: false,
            lines: this.state.lines + getFullLines(board).length,
            score: this.state.score + getFullLines(board).length*10
          });
          this.startFlow();
        }, 2000 );

      } else {
        this.setState({board: board});
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.state.board !== prevState.board) {
        this.injectNextPiece();
      }

      const {score, level} = this.state;
      if (score >= level * 100) {
        this.setState({level: level + 1});
      }
    }

    handleMove = direction => {
      if (!this.state.intervalId) return;

      this.move(direction);
    }

    handleRotate = (direction) => {
      if (!this.state.intervalId) return;

      const {board, currentPiece, currentPos: {x, y}} = this.state;
      const rotatedPiece = rotate(currentPiece, direction === ROTATE_LEFT);
      const result = canPlace(board, rotatedPiece, x, y);

      if (result === CAN_PLACE) {
        this.setState({
          currentBoard: place(board, rotatedPiece, x, y),
          currentPiece: rotatedPiece
        });
      }
    }

    render() {
      const {currentBoard, gameOver, nextPiece, lines, score, level, effects} = this.state;
      return (
        <div className="container">
          <div className="console">
            <div className="screen-border">
              <div className="main-screen">
                <div className="game-screen">
                  <Screen board={currentBoard} effects={effects} />
                </div>
                <Info nextPiece={nextPiece} lines={lines} score={score} level={level}/>
              </div>
              <div></div>
              {gameOver && <h1>Game Over</h1>}
            </div>
            <Controller onMove ={this.handleMove}
              onRotate={this.handleRotate}
              onNewGame={this.startNewGame}
            /></div>
        </div>);
    }
}

export default Game;
