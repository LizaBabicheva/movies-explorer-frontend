import { useState, useEffect } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import filterShortMovies from '../../utils/utils';

function SavedMovies(props) {

  const [movies, setMovies] = useState([]); 
  const [shortMoviesChecked, setShortMoviesChecked] = useState(false);

  function handleCheckbox() {
    const newValue = !shortMoviesChecked;
    localStorage.setItem('savedShortMoviesCheckboxState', newValue);
    setShortMoviesChecked(newValue);
  }

  useEffect(() => {
    const moviesList = shortMoviesChecked ? filterShortMovies(props.moviesList) : props.moviesList;
    setMovies(moviesList);
  }, [shortMoviesChecked, props.moviesList])

  useEffect(() => {
    const shortMoviesCheckedSaved = JSON.parse(localStorage.getItem('savedShortMoviesCheckboxState'));
    setShortMoviesChecked( shortMoviesCheckedSaved !== null ? shortMoviesCheckedSaved : false);
  }, [props.loggedIn])

  const initialMoviesSearcQuerySaved = localStorage.getItem('initialSavedMovieSearchQuery') ?? '';

  return (
    <section className="movies">
      <SearchForm
        onSearch={props.onSearch}
        shortMoviesChecked={shortMoviesChecked}
        onCheckbox={handleCheckbox}
        initialQuery={initialMoviesSearcQuerySaved}
      />
      <MoviesCardList
        onDelete={props.onDelete}
        moviesList={movies}
        loggedIn={props.loggedIn}

        //?
        shownListSize={props.shownListSize}
      />
    </section>
  )
}

export default SavedMovies;