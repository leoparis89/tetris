import React, {Component} from 'react';

export const DOWN = 'DOWN';
export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const ROTATE_LEFT = 'ROTATE_LEFT';
export const ROTATE_RIGHT = 'ROTATE_RIGHT';


class Controller extends Component {
  componentDidMount() {
    const {sendCommand, rotate} = this.props;
    document.addEventListener('keydown', (event) => {
      const char = event.key;

      switch (char) {
      case 's':
        sendCommand(DOWN);
        break;
      case 'q':
        sendCommand(LEFT);
        break;
      case 'd':
        sendCommand(RIGHT);
        break;
      case 'a':
        rotate(ROTATE_LEFT);
        break;
      case 'e':
        rotate(ROTATE_RIGHT);
        break;
      }
    });
  }

  render() {
    return (<div>bar</div>);
  }
}

export default Controller;
