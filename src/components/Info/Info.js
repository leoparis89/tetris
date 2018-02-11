import React from 'react';
import Screen from '../Screen/Screen';
import './Info.scss';

const Info = ({nextPiece, lines, score}) => {
  return (
    <div className="info__container">
      <div className="next-piece">
        <h3>Next piece:</h3>
        <div className="next-piece__screen__container">
          <Screen board={nextPiece} effects={false}/>
        </div>
      </div>
    </div>
  );
};

export default Info;
