import { useState, useEffect } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import filterShortMovies from '../../utils/utils';
import { filterMovies } from '../../utils/utils';
import { NOTHING_FOUND_MESSAGE } from '../../utils/constants';

function SavedMovies({ moviesList, loggedIn, onDelete, setMoviesIsLoading }) {
  const [movies, setMovies] = useState([]);
  const [shortMoviesChecked, setShortMoviesChecked] = useState(false);
  const initialMoviesSearcQuerySaved = '';
  const [notFoundMessage, setNotFoundMessage] = useState('');

  useEffect(() => {
    const filteredMovies = shortMoviesChecked ? filterShortMovies(moviesList) : moviesList;
    setMovies(filteredMovies);
  }, [shortMoviesChecked, moviesList])

  function handleSavedMoviesSearch(searchQuery) {
    setMoviesIsLoading(true);
    const searchedSavedMoviesData = filterMovies(moviesList, searchQuery);
    setMovies(searchedSavedMoviesData);
    if (searchedSavedMoviesData.length === 0) {
      setNotFoundMessage(NOTHING_FOUND_MESSAGE);
    }
    setMoviesIsLoading(false);
  }

  function handleCheckbox() {
    const newValue = !shortMoviesChecked;
    setShortMoviesChecked(newValue);
    setShortMoviesChecked(!shortMoviesChecked);
  }

  return (
    <section className="movies">
      <SearchForm
        onSearch={handleSavedMoviesSearch}
        shortMoviesChecked={shortMoviesChecked}
        onCheckbox={handleCheckbox}
        initialQuery={initialMoviesSearcQuerySaved} />

      {movies.length === 0
        ? <p className='movies__not-found-message'>{notFoundMessage}</p>
        : <MoviesCardList
          onDelete={onDelete}
          moviesList={movies}
          loggedIn={loggedIn} />
      }

    </section>
  )
}

export default SavedMovies;