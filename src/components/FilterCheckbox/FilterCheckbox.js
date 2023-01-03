import './FilterCheckbox.css';

function FilterCheckbox({ shortMoviesChecked, onCheckbox }) {

  function handleCheckbox() {
    onCheckbox();
  }

  return (
    <div className='filter'>
      <input
        type='checkbox'
        id='switch'
        className='filter__input'
        onChange={handleCheckbox}
        checked={shortMoviesChecked}>
      </input>
      <label htmlFor='switch' className='filter__label'></label>
      <p className='filter__title'>Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox;