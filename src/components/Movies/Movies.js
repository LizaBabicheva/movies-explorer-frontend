// import { useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import moviesApi from '../../utils/MoviesApi';


function Movies(props) {

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList
        onMovieLike={props.onMovieLike}
        moviesList={props.moviesList}
        shownListSize={props.shownListSize} />
      <button className='movies__more-button' type='button' aria-label='Загрузить еще' onClick={props.onLoadMore}>Ещё</button>
    </section>
  )
}

export default Movies;