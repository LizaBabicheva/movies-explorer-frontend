import { Route } from 'react-router-dom';
import './MoviesCard.css';
import { transformDuration, imageUrl } from '../../utils/utils';

function MoviesCard({ movie, onMovieLike, onDelete, isLiked, savedMovieIdByMovieId }) {
  const movieLikeClassName = (`movie-card__like-button ${isLiked ? 'movie-card__like-button_active' : ''}`);

  function handleLikeClick() {
    if (isLiked) {
      onDelete(savedMovieIdByMovieId[movie.id]);
    } else {
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
  }

  function handleDeleteClick() {
    onDelete(movie._id);
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

  return (
    <li className='movie-card'>
      <img className='movie-card__img' alt={`Постер к фильму ${movie.nameRU}`}
        src={formatImageUrl(movie.image)}
        title='Нажмите, чтобы посмотреть трейлер'
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
            onClick={handleDeleteClick}>
          </button>
        </Route>

        <p className='movie-card__duration'>{transformDuration(movie.duration)}</p>
      </div>
    </li>
  )
}

export default MoviesCard;