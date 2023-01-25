import React from 'react';
import './InfoTooltip.css';

function InfoTooltip({ isOpen, InfoTooltipText, onClose }) {
  return (
    <div className={`info-tooltip ${isOpen && 'info-tooltip_opened'}`}>
      <div className='info-tooltip__container'>
        <h3 className='info-tooltip__text'>
          {InfoTooltipText}
        </h3>
      <button className='info-tooltip__close-button' type='button' aria-label='Закрыть'
        onClick={onClose}>
      </button>
      </div>
  </div>
  )
}

export default InfoTooltip;