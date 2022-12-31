import { useEffect, useState } from 'react';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  const [shortMoviesList, setShortMoviesList] = useState([]);

  useEffect(() => {
    setShortMoviesList(props.moviesList.filter((movie) =>
      movie.duration < 40))
  }, [props.isChecked, props.moviesList])

  //

  //

  return (
    <ul className='movies-list'>

      {props.isChecked ?
        shortMoviesList.map((movie, idx) => (
          idx < props.shownListSize
            ? <MoviesCard

              onMovieLike={props.onMovieLike}
              movie={movie}
              key={movie.id || movie._id}
              onDelete={props.onDelete}
              savedMovieIdByMovieId={props.savedMovieIdByMovieId}
              isLiked={props.isLiked && props.isLiked(movie)} />
            : ''
        ))
        : props.moviesList.map((movie, idx) => (
          idx < props.shownListSize

            ? <MoviesCard
              onMovieLike={props.onMovieLike}
              movie={movie}
              key={movie.id || movie._id}
              savedMovieIdByMovieId={props.savedMovieIdByMovieId}
              onDelete={props.onDelete}
              isLiked={props.isLiked && props.isLiked(movie)} />
            : ''
        ))}
    </ul>
  )
}

export default MoviesCardList;