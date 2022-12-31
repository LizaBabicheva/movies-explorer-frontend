import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ movie, onMovieLike, onDelete, isLiked }) {
  // const [isLiked, setIsLiked] = useState(false);

  const movieLikeClassName = (
    `movie-card__like-button ${movie.isLiked ? 'movie-card__like-button_active' : ''}`
  );

  const imageUrl = 'https://api.nomoreparties.co/';

  const durationInMinutes = movie.duration;
  const hours = Math.floor(durationInMinutes / 60);
  const remainingMinutes = durationInMinutes % 60;

  // function handleLikeClick() {
  //   setIsLiked(!isLiked)
  // }

  function handleLikeClick() {
    // setIsLiked(!isLiked);
    onMovieLike(
      {
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: imageUrl + movie.image.url,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: imageUrl + movie.image.formats.thumbnail.url,
        movieId: movie.id,
      }
    )
  }

  function handleDeleteClick() {
    onDelete(movie);
  }

  function handleClick() {
    window.open(movie.trailerLink, '_blank');
  }

  function formatImageUrl(image) {
    if (typeof image === 'string') {
      return image;
    };

    return imageUrl + image.url;
  }

  // function formatThumbnailUrl(thumbnail) {
  //   if (typeof thumbnail === 'string'){
  //       return thumbnail;
  //   };

  //   return movie.image.formats.thumbnail.url;
  // }

  return (
    <li className='movie-card'>
      <img className='movie-card__img' alt={`Постер к фильму ${movie.nameRU}`}
        src={formatImageUrl(movie.image)}
        title='Кликните, чтоб посмотреть трейлер'
        onClick={handleClick}></img>
      <div className='movie-card__description'>
        <h2 className='movie-card__title'>{movie.nameRU}</h2>
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