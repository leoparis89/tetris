import React from 'react';
import Screen from '../Screen/Screen';

const Info = ({nextPiece}) => {
  return (<div>cool
  <Screen board={nextPiece || []}/>
  </div>);
};

export default Info;
