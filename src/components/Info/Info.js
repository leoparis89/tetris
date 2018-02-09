import React from 'react';
import Screen from '../Screen/Screen';

const Info = ({nextPiece, lines, score}) => {
  return (<div>
    <Screen board={nextPiece}/>
  </div>);
};

export default Info;
