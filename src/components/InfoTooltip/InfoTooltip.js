import React from 'react';
import './InfoTooltip.css';

function InfoTooltip(props) {
  return (
    <div className={`info-tooltip ${props.isOpen && 'info-tooltip_opened'}`}>
      <div className='info-tooltip__container'>
        <h3 className='info-tooltip__heading'>
          {props.InfoTooltipText}
        </h3>
      <button className='info-tooltip__close-button' type='button' aria-label='Закрыть'
        onClick={props.onClose}>
      </button>
      </div>
  </div>
  )
}

export default InfoTooltip;