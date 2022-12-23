import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard(props) {
  const [isLiked, setIsLiked] = useState(false);

  function handleLikeClick() {
    setIsLiked(!isLiked)
  }

//   function getTimeFromMins(mins) {
//     let hours = Math.trunc(mins/60);
// 	let minutes = mins % 60;
// 	return hours + 'ч. ' + minutes + 'м.';
// };



  return (
    <li className='movie-card'>
      <img className='movie-card__img' alt={`Постер к фильму ${props.name}`} src={props.image}></img>
      <div className='movie-card__description'>
        <h2 className='movie-card__title'>{props.name}</h2>
        <Route path='/movies'>
          <button
            type='button'
            className={`movie-card__like-button ${isLiked ? 'movie-card__like-button_active' : ''}`}
            aria-label='Сохранить'
            onClick={props.onMovieLike}>
          </button>
        </Route>
        <Route path='/saved-movies'>
          <button
            type='button'
            className='movie-card__delete-button'
            aria-label='Удалить'
          // onClick={}
          >
          </button>
        </Route>
        <p className='movie-card__duration'>{props.movie.duration}</p>
      </div>
    </li>
  )
}

export default MoviesCard;