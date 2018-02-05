import React from 'react';
import './Screen.scss';

const Screen = ({board}) => {
  return (<div className="frame">
    {board.map(el => {
      return (<tr>
        {
          el.map(r => (<td><div className={`block block__color--${r}`}></div></td>))
        }
      </tr>);
    })}
  </div>);
};

export default Screen;
