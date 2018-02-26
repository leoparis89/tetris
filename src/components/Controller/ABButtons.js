import React from 'react';
import './ABButtons.scss';

const ABButtons = ({onNewGame = () => {}})=> {
  return <div>
    <span className="ab-button" onClick={onNewGame}></span>
    <span className="ab-button--b" onClick={onNewGame}></span>
  </div>;
};

export default ABButtons;
