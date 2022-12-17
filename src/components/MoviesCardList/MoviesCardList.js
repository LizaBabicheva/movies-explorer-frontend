import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  return (
    <ul className='movies-list'>
      {props.moviesList.map((movie) => (
        <MoviesCard
          movie={movie}
          key={movie._id}
        // onMovieLike={onMovieLike}
        // onMovieDelete={onMovieDelete}
        />
      ))}
    </ul>
  )
}

export default MoviesCardList;