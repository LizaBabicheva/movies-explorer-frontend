import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <label className="filter">
      <input className="filter__switch" type="checkbox"></input>
      <div className="filter__switch-tumbler"></div>
      <span className="filter__title">Короткометражки</span>
    </label>
  )
}

export default FilterCheckbox;