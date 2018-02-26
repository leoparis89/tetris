import React from 'react';
import './Cross.scss';
import {DOWN, LEFT, RIGHT} from './Controller';

const Cross = ({onMove = () => {}})=> {
  return <div>
    <div className="cross__row">
      <span className="cross__vertical"></span>
    </div>
    <div className="cross__row">
      <span className="cross__horizontal" onClick={() => onMove(LEFT)}></span>
      <span className="cross__core"></span>
      <span className="cross__horizontal" onClick={() => onMove(RIGHT)}></span>
    </div>
    <div className="cross__row">
      <span className="cross__vertical" onClick={() => onMove(DOWN)}></span>
    </div>
  </div>;
};

export default Cross;
