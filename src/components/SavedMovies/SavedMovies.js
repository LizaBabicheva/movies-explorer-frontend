import { useState, useEffect } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import filterShortMovies from '../../utils/utils';

function SavedMovies({ moviesList, loggedIn, onSearch, onDelete, shownListSize }) {
  const [movies, setMovies] = useState([]);
  const [shortMoviesChecked, setShortMoviesChecked] = useState(false);
  const initialMoviesSearcQuerySaved = '';

  useEffect(() => {
    const filteredMovies = shortMoviesChecked ? filterShortMovies(moviesList) : moviesList;
    setMovies(filteredMovies);
  }, [shortMoviesChecked, moviesList])

  useEffect(() => {
    const shortMoviesCheckedSaved = JSON.parse(localStorage.getItem('savedShortMoviesCheckboxState'));
    setShortMoviesChecked(shortMoviesCheckedSaved !== null ? shortMoviesCheckedSaved : false);
  }, [loggedIn])

  function handleCheckbox() {
    const newValue = !shortMoviesChecked;
    localStorage.setItem('savedShortMoviesCheckboxState', newValue);
    setShortMoviesChecked(newValue);
    setShortMoviesChecked(!shortMoviesChecked);
  }

  return (
    <section className="movies">
      <SearchForm
        onSearch={onSearch}
        shortMoviesChecked={shortMoviesChecked}
        onCheckbox={handleCheckbox}
        initialQuery={initialMoviesSearcQuerySaved} />

      <MoviesCardList
        onDelete={onDelete}
        moviesList={movies}
        loggedIn={loggedIn}
        shownListSize={shownListSize} />
    </section>
  )
}

export default SavedMovies;