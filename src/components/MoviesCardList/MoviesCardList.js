import { useEffect, useState } from 'react';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  return (
    <ul className='movies-list'>
      {props.moviesList.length === 0 && 'Ничего не найдено'}
          {props.moviesList.map((movie, idx) => (
            idx < props.shownListSize
              ? <MoviesCard
                onMovieLike={props.onMovieLike}
                movie={movie}
                key={movie.id || movie._id}
                savedMovieIdByMovieId={props.savedMovieIdByMovieId}
                onDelete={props.onDelete}
                isLiked={props.isLiked && props.isLiked(movie)} />
              : ''
          ))
        }
    </ul>
  )
}

export default MoviesCardList;