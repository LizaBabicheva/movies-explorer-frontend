import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import useForm from '../../hooks/useForm';

function SearchForm({ onSearch, shortMoviesChecked, onCheckbox, initialQuery }) {

  const stateSchema = {
    search: { value: initialQuery, error: '' },
  };

  function onSubmitForm(state) {
    onSearch(state.search.value);
  }

  const validationStateSchema = {
    search: {
      required: true,
      requiredErrorMessage: 'Нужно ввести ключевое слово',
    },
  };

  const { state, handleOnChange, handleOnSubmit } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  );

  return (
    <div className='search'>
      <form className='search__field'
        onSubmit={handleOnSubmit}>
        <input
          className='search__input'
          name='search'
          type='text'
          placeholder='Фильм'
          value={state.search.value}
          onChange={handleOnChange}>
        </input>
        <button className='search__button' type='submit'>Найти</button>
      </form>
      <p className='search__error'>{state.search.error}</p>

      <FilterCheckbox
        shortMoviesChecked={shortMoviesChecked}
        onCheckbox={onCheckbox}
      />

    </div>
  )
}

export default SearchForm;