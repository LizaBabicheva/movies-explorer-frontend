import { useEffect, useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
// import moviesApi from '../../utils/MoviesApi';

function SearchForm({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearchFormChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch();
  }

  return (
    <div className='search'>
      <form className='search__field'
        onSubmit={handleSubmit}>
        <input
          className='search__input'
          type='text' name='movie-title'
          placeholder='Фильм'
          required
          value={searchQuery}
          onChange={handleSearchFormChange}></input>
        <button className='search__button' type='submit'>Найти</button>
      </form>

      <FilterCheckbox />

    </div>
  )
}

export default SearchForm;