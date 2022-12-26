import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard(props) {
  // const [isLiked, setIsLiked] = useState(false);

  const movieLikeClassName = (
    `movie-card__like-button ${props.isLiked ? 'movie-card__like-button_active' : ''}`
  );

  const durationInMinutes = props.duration;
  const hours = Math.floor(durationInMinutes / 60);
  const remainingMinutes = durationInMinutes % 60;

  // function handleLikeClick() {
  //   setIsLiked(!isLiked)
  // }

  function handleLikeClick() {
    // setIsLiked(!isLiked);
    props.onMovieLike({
      country: props.movie.country,
      director: props.movie.director,
      duration: props.duration,
      year: props.movie.year,
      description: props.movie.description,
      image: props.image,
      trailerLink: props.trailerLink,
      nameRU: props.name,
      nameEN: props.movie.nameEN,
      // thumbnail: props.thumbnail,
      thumbnail: props.movie.image.formats.thumbnail.url,
      movieId: props.movie.id,
    })
  }

  function handleDeleteClick() {
    props.onDelete(props.movie);
  }

  function handleClick() {
    window.open(props.trailerLink, '_blank');
  }


  return (
    <li className='movie-card'>
      <img className='movie-card__img' alt={`Постер к фильму ${props.name}`}
        src={props.image}
        title='Кликните, чтоб посмотреть трейлер'
        onClick={handleClick}></img>
      <div className='movie-card__description'>
        <h2 className='movie-card__title'>{props.name}</h2>
        <Route path='/movies'>
          <button
            type='button'
            className={movieLikeClassName}
            aria-label='Сохранить'
            onClick={handleLikeClick}>
          </button>
        </Route>
        <Route path='/saved-movies'>
          <button
            type='button'
            className='movie-card__delete-button'
            aria-label='Удалить'
            onClick={handleDeleteClick}
          >
          </button>
        </Route>
        <p className='movie-card__duration'>{`${hours}ч ${remainingMinutes}м`}</p>
      </div>
    </li>
  )
}

export default MoviesCard;