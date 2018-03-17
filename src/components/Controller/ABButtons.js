import React from 'react';
import './ABButtons.scss';
import PropTypes from 'prop-types';

const ABButtons = ({
                     onRotate = () => {
                     },
                     onFixDown = () => {
                     }
                   }) => {
  return <div>
    <span className="ab-button" onClick={onFixDown}></span>
    <span className="ab-button--b" onClick={() => onRotate(true)}></span>
  </div>;
};

ABButtons.propTypes = {
  onRotate: PropTypes.func,
  onFixDown: PropTypes.func
};

export default ABButtons;
