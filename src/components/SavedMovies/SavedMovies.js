import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {

  return (
    <div>
      <MoviesCardList
      onDelete={props.onDelete}
      />
    </div>
  )
}

export default SavedMovies;