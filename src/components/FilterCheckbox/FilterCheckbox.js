import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className='filter'>
      <input type='checkbox' id='switch' className='filter__input'></input>
      <label htmlFor='switch' className='filter__label'></label>
      <p className='filter__title'>Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox;