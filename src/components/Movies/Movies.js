import { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import filterShortMovies from '../../utils/utils';


function Movies({ moviesList, setMoviesList, setNotFoundMessage, notFoundMessage, loggedIn, onSearch, moviesIsLoading, onMovieLike, shownListSize, onDelete, isLiked, savedMovieIdByMovieId, onLoadMore }) {
  const [movies, setMovies] = useState([]);
  const [shortMoviesChecked, setShortMoviesChecked] = useState(false);
  const initialMoviesSearcQuerySaved = localStorage.getItem('initialMovieSearchQuery') ?? '';

  useEffect(() => {
    const filteredMovies = shortMoviesChecked ? filterShortMovies(moviesList) : moviesList;
    setMovies(filteredMovies);
  }, [shortMoviesChecked, moviesList])

  useEffect(() => {
    const savedFilteredMovies = JSON.parse(localStorage.getItem('movieSearchResult')) ?? [];
    setMoviesList(savedFilteredMovies);

    const shortMoviesCheckedSaved = JSON.parse(localStorage.getItem('shortMoviesCheckboxState'));
    setShortMoviesChecked(shortMoviesCheckedSaved !== null ? shortMoviesCheckedSaved : false);

    if (savedFilteredMovies.length === 0) {
      const notFoundMessage = localStorage.getItem('notFoundMessage');
      setNotFoundMessage(notFoundMessage);
    }
  }, [loggedIn])

  function handleCheckbox() {
    localStorage.setItem('shortMoviesCheckboxState', !shortMoviesChecked);
    setShortMoviesChecked(!shortMoviesChecked);
  }

  return (
    <section className='movies'>
      <SearchForm
        onSearch={onSearch}
        shortMoviesChecked={shortMoviesChecked}
        initialQuery={initialMoviesSearcQuerySaved}
        onCheckbox={handleCheckbox} />

      {moviesIsLoading
        ? <Preloader />
        : moviesList.length === 0
          ? <p className='movies__not-found-message'>{notFoundMessage}</p>
          : <>

            <MoviesCardList
              onMovieLike={onMovieLike}
              moviesList={movies}
              shownListSize={shownListSize}
              onDelete={onDelete}
              isLiked={isLiked}
              savedMovieIdByMovieId={savedMovieIdByMovieId} />

            {shownListSize < moviesList.length && moviesList.length > 0
              ? <button className='movies__more-button' type='button' aria-label='Загрузить еще' onClick={onLoadMore}>Ещё</button>
              : ''}
          </>
      }
    </section>
  )
}

export default Movies;