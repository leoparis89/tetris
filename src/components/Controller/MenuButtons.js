import React from 'react';
import './MenuButtons.scss';

const MenuButtons = ({
                       onNewGame = () => {
                       },
                       onPause = () => {
                       }
                     }) => {
  return <div>
    <span className="menu-buttons" onClick={onPause}></span>
    <span className="menu-buttons" onClick={onNewGame}></span>
  </div>;
};

export default MenuButtons;
