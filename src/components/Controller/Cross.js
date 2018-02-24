import React from 'react';
import './Cross.scss';

const Cross = props => {
  return <div>
    <div className="cross__row">
      <span className="cross__vertical"></span>
    </div>
    <div className="cross__row">
      <span className="cross__horizontal"></span>
      <span className="cross__core"></span>
      <span className="cross__horizontal"></span>
    </div>
    <div className="cross__row">
      <span className="cross__vertical"></span>
    </div>
  </div>;
};

export default Cross;
