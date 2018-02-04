import React from 'react';

const Screen = ({game}) => {
  return (<div>
    {game.map(el => {
      return (<tr>
        {
          el.map(r => (<td>{r}</td>))
        }
      </tr>);
    })}
  </div>);
};

export default Screen;
