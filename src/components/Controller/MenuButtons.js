import React from 'react';
import './MenuButtons.scss';

const MenuButtons = ({onNewGame = () => {}})=> {
  return <div>
    <span className="menu-buttons" onClick={onNewGame}></span>
    <span className="menu-buttons" onClick={onNewGame}></span>
  </div>;
};

export default MenuButtons;
