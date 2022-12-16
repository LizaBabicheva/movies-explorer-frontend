import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {

  const SavedMovies = props.movies.filter(i => i.saved);
  return (
    <div>
      <MoviesCardList
        movies={ SavedMovies} />
    </div>
  )
}

export default SavedMovies;