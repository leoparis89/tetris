import React from 'react';

const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const ROTATE_LEFT = 'ROTATE_LEFT';
const ROTATE_RIGHT = 'ROTATE_RIGHT';

const Controller = ({sendCommand}) => {
  document.addEventListener('keypress', (event) => {
    const char = String.fromCharCode(event.keyCode);

    switch (char) {
    case 'z':
      sendCommand(UP);
      break;
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
      sendCommand(ROTATE_LEFT);
      break;
    case 'e':
      sendCommand(ROTATE_RIGHT);
      break;
    }
  });
  return (<div>bars</div>);
};

export default Controller;
