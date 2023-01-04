import { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
// import moviesApi from '../../utils/MoviesApi';
import filterShortMovies from '../../utils/utils';


function Movies(props) {

  const [movies, setMovies] = useState([]);
  const [shortMoviesChecked, setShortMoviesChecked] = useState(false);

  const initialMoviesSearcQuerySaved = localStorage.getItem('initialMovieSearchQuery') ?? '';

  function handleCheckbox() {
    localStorage.setItem('shortMoviesCheckboxState', !shortMoviesChecked);
    setShortMoviesChecked(!shortMoviesChecked);
  }

  useEffect(() => {
    const moviesList = shortMoviesChecked ? filterShortMovies(props.moviesList) : props.moviesList;
    setMovies(moviesList);
  }, [shortMoviesChecked, props.moviesList])

  useEffect(() => {
    const savedFilteredMovies = JSON.parse(localStorage.getItem('movieSearchResult')) ?? [];
    props.setMoviesList(savedFilteredMovies);

    const shortMoviesCheckedSaved = JSON.parse(localStorage.getItem('shortMoviesCheckboxState'));
    setShortMoviesChecked( shortMoviesCheckedSaved !== null ? shortMoviesCheckedSaved : false);


  }, [props.loggedIn])

  return (
    <section className="movies">
      <SearchForm
        onSearch={props.onSearch}
        shortMoviesChecked={shortMoviesChecked}
        initialQuery={initialMoviesSearcQuerySaved}
        // onCheckbox={props.onCheckbox}
        onCheckbox={handleCheckbox}
      />

      {props.moviesIsLoading
        ? <Preloader />
        : <>
          <MoviesCardList
            onMovieLike={props.onMovieLike}
            moviesList={movies}
            shownListSize={props.shownListSize}
            onDelete={props.onDelete}
            isLiked={props.isLiked}
            savedMovieIdByMovieId={props.savedMovieIdByMovieId}
            // shortMoviesChecked={shortMoviesChecked}
             />

          <Route path='/movies'>
            <button className='movies__more-button' type='button' aria-label='Загрузить еще' onClick={props.onLoadMore}>Ещё</button>
          </Route>
        </>
      }
    </section>
  )
}

export default Movies;