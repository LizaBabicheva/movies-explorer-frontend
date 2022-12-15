import React from 'react';
import './MoviesCard.css';

function MoviesCard({ title, image, duration }) {
  return (
    <li className='movie-card'>
      <img className='movie-card__img' alt={`Постер к фильму ${title}`} src={image}></img>
      <div className='movie-card__description'>
        <h2 className='movie-card__title'>{title}</h2>
        <button
          type='button'
          className='movie-card__like-button'
          aria-label='Нравится'>
        </button>
        <p className='movie-card__duration'>{duration}</p>
      </div>
    </li>
  )
}

export default MoviesCard;