import React from 'react';
import './MoviesCard.css';

function MoviesCard() {
  return (
    <li className='movie-card'>
      <img className='movie-card__img' alt='' src=''></img>
      <div className='movie-card__description'>
        <h2 className='movie-card__title'></h2>
        <p className='movie-card__duration'></p>
        <button className='movie-card__like-button' type="button" aria-label="Нравится"></button>
      </div>
    </li>
  )
}
  
export default MoviesCard;