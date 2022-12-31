import { useEffect, useState } from 'react';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  // const imageUrl = 'https://api.nomoreparties.co/';

  // const filterEnabled = true;

  // function filtered(movie) {
  //   return !filterEnabled && movie.lenght < 100;
  // }

  const [shortMoviesList, setShortMoviesList] = useState([]);

// function 

useEffect(() => {
  setShortMoviesList(props.moviesList.filter((movie) =>
  movie.duration < 100))
}, [props.isChecked])

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
            isLiked={props.isLiked} />
          : ''
      ))
    : props.moviesList.map((movie, idx) => (
      idx < props.shownListSize

        ? <MoviesCard
          onMovieLike={props.onMovieLike}
          movie={movie}
          key={movie.id || movie._id}
          onDelete={props.onDelete}
          isLiked={props.isLiked} />
        : ''
    ))}
    </ul>
  )
}

export default MoviesCardList;