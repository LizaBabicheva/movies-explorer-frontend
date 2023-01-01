import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  return (
    <ul className='movies-list'>
      {props.moviesList.map((movie, idx) => (
        idx < props.shownListSize ?
          <MoviesCard
            movie={movie}
            key={movie._id} />
          : ''
      ))}
    </ul>
  )
}

export default MoviesCardList;