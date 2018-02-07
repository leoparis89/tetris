import React from 'react';
import './Screen.scss';

const Screen = ({board}) => {
  return (<div className="frame">
    {board.map((row, i) => {
      return (
        <div key={i}>
          {
            row.map((col, j) => (<span key={j}className={`block block__color--${col}`}></span>))
          }
        </div>);
    })}
  </div>);
};

export default Screen;
