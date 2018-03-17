import PropTypes from 'prop-types';
import React, {Component} from 'react';
import './Controller.scss';
import Cross from './Cross';
import MenuButtons from './MenuButtons';
import ABButtons from './ABButtons';

export const DOWN = 'DOWN';
export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const ROTATE_LEFT = 'ROTATE_LEFT';
export const ROTATE_RIGHT = 'ROTATE_RIGHT';


class Controller extends Component {
  componentDidMount() {
    const {onMove, onRotate, onPause, onFixDown} = this.props;

    document.addEventListener('keypress', (event) => {
      const char = event.key;
      switch (char) {
        case 's':
          onMove(DOWN);
          break;
        case 'q':
          onMove(LEFT);
          break;
        case 'd':
          onMove(RIGHT);
          break;
        case 'a':
          onRotate(ROTATE_LEFT);
          break;
        case 'e':
          onRotate(ROTATE_RIGHT);
          break;
        case 'p':
          onPause();
          break;
        case ' ':
          onFixDown();
          break;
      }
    });
  }

  render() {
    return (
      <div className="controller__container">
        <Cross onMove={this.props.onMove}/>
        <MenuButtons onNewGame={this.props.onNewGame} onPause={this.props.onPause}/>
        <ABButtons/>
      </div>);
  }
}

Controller.propTypes = {
  onMove: PropTypes.func,
  onRotate: PropTypes.func,
  onPause: PropTypes.func,
  onFixDown: PropTypes.func,
  onNewGame: PropTypes.func
};

export default Controller;
