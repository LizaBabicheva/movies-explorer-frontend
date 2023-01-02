import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies(props) {

  return (
    <div>
      <SearchForm
        onSearch={props.onSearch}
        isChecked={props.isChecked}
        onCheckbox={props.onCheckbox}
      />
      <MoviesCardList
        onDelete={props.onDelete}
        key={props.movie.id}
      />
    </div>
  )
}

export default SavedMovies;