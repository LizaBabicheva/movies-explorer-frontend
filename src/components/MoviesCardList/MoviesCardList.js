import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  return (
    <ul className='movies-list'>
      {props.movies.map((movieItem) => (
        <MoviesCard
          movie={movieItem}
          key={movieItem._id}
        // onMovieLike={onMovieLike}
        // onMovieDelete={onMovieDelete}
        />
      ))}
    </ul>
  )
}

export default MoviesCardList;