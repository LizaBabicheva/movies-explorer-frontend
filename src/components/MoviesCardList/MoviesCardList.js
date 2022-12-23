import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  const imageUrl = 'https://api.nomoreparties.co/';

  return (
    <ul className='movies-list'>
      {props.moviesList.map((movie, idx) => (
        idx < props.shownListSize ?
          <MoviesCard
            movie={movie}
            name={movie.nameRU}
            image={imageUrl + movie.image.url}
            duration={movie.duration}
            key={movie.id} />
          : ''
      ))}
    </ul>
  )
}

export default MoviesCardList;