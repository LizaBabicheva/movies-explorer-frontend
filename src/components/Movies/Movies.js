import { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import filterShortMovies from '../../utils/utils';


function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [shortMoviesChecked, setShortMoviesChecked] = useState(false);
  const initialMoviesSearcQuerySaved = localStorage.getItem('initialMovieSearchQuery') ?? '';

  useEffect(() => {
    const moviesList = shortMoviesChecked ? filterShortMovies(props.moviesList) : props.moviesList;
    setMovies(moviesList);
  }, [shortMoviesChecked, props.moviesList])

  useEffect(() => {
    const savedFilteredMovies = JSON.parse(localStorage.getItem('movieSearchResult')) ?? [];
    props.setMoviesList(savedFilteredMovies);

    const shortMoviesCheckedSaved = JSON.parse(localStorage.getItem('shortMoviesCheckboxState'));
    setShortMoviesChecked(shortMoviesCheckedSaved !== null ? shortMoviesCheckedSaved : false);

    if (savedFilteredMovies.length === 0) {
      const notFoundMessage = localStorage.getItem('notFoundMessage');
      props.setNotFoundMessage(notFoundMessage);
    }
  }, [props.loggedIn])

  function handleCheckbox() {
    localStorage.setItem('shortMoviesCheckboxState', !shortMoviesChecked);
    setShortMoviesChecked(!shortMoviesChecked);
  }

  return (
    <section className='movies'>
      <SearchForm
        onSearch={props.onSearch}
        shortMoviesChecked={shortMoviesChecked}
        initialQuery={initialMoviesSearcQuerySaved}
        onCheckbox={handleCheckbox}
      />

      {props.moviesIsLoading
        ? <Preloader />
        : props.moviesList.length === 0
          ? <p className='movies__not-found-message'>{props.notFoundMessage}</p>
          : <>

            <MoviesCardList
              onMovieLike={props.onMovieLike}
              moviesList={movies}
              shownListSize={props.shownListSize}
              onDelete={props.onDelete}
              isLiked={props.isLiked}
              savedMovieIdByMovieId={props.savedMovieIdByMovieId}
            />

            {props.shownListSize < props.moviesList.length && props.moviesList.length > 0
              ? <button className='movies__more-button' type='button' aria-label='Загрузить еще' onClick={props.onLoadMore}>Ещё</button>
              : ''}
          </>
      }
    </section>
  )
}

export default Movies;