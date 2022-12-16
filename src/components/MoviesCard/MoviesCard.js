import React, { useState } from 'react';
import './MoviesCard.css';

function MoviesCard(props) {

  const [isLiked, setIsLiked] = useState(false);

  function handleLikeClick() {
    setIsLiked(!isLiked)
  }

  return (
    <li className='movie-card'>
      <img className='movie-card__img' alt={`Постер к фильму ${props.movie.title}`} src={props.movie.image}></img>
      <div className='movie-card__description'>
        <h2 className='movie-card__title'>{props.movie.title}</h2>
        <button
          type='button'
          className={`movie-card__like-button ${isLiked && 'movie-card__like-button_active'}`}
          aria-label='Нравится'
          onClick={handleLikeClick}>
        </button>
        <p className='movie-card__duration'>{props.movie.duration}</p>
      </div>
    </li>
  )
}

export default MoviesCard;