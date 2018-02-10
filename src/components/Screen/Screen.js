import React from 'react';
import './Screen.scss';

const Screen = ({board}) => {
  return (<div className="frame">
    {board && board.map((row, i) => {
      let isFullLine = true;
      row.map(el => el || (isFullLine = false));

      return (
        <div key={i}>
          {
            row.map((col, j) => (
              <span key={j}
                className={`block block__color--${col} ${isFullLine ? 'block--delete' : ''}`}>
              </span>)
            )
          }
        </div>);
    })}
  </div>);
};

export default Screen;
