import React from 'react';
import './InputFeedback.css';

const InputFeedback = ({ isOk, feedback }) => {
  if (feedback === '') {
    return (
      <div className='input-feedback'>
        <div className='empty-input-feedback'></div>
      </div>
    );
  } else {
    return (
      <div className='input-feedback'>
        <p className={isOk ? 'ok' : 'error'}>{feedback}</p>
      </div>
    );
  }
};

export default InputFeedback;