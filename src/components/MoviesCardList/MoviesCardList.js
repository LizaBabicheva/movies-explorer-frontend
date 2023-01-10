import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesList, shownListSize, onMovieLike, savedMovieIdByMovieId, onDelete, isLiked }) {

  return (
      <ul className='movies-list'>
        {moviesList.map((movie, idx) => (
          idx < shownListSize
            ? <MoviesCard
              onMovieLike={onMovieLike}
              movie={movie}
              key={movie.id || movie._id}
              savedMovieIdByMovieId={savedMovieIdByMovieId}
              onDelete={onDelete}
              isLiked={isLiked && isLiked(movie)} />
            : ''
        ))
        }
      </ul>
  )
}

export default MoviesCardList;