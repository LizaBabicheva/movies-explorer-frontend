import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <div className='search'>
      <form className='search__field'>
        <input
          className='search__input'
          type='text' name='movie-title'
          placeholder='Фильм'
          required></input>
        <button className='search__button'>Найти</button>
      </form>

      <FilterCheckbox />

    </div>
  )
}

export default SearchForm;