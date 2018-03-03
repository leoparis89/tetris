import React from 'react';
import Screen from '../Screen/Screen';
import Info from '../Info/Info';
import './Partie.scss';

const Partie = ({board, nextPiece, effects, lines, score, level}) => {
  return (
    <div style={{display:'flex'}}>
      <div className="block-well">
        <Screen board={board} effects={effects} />
      </div>
      <Info nextPiece={nextPiece} lines={lines} score={score} level={level}/>
    </div>
  );
};

export default Partie;
