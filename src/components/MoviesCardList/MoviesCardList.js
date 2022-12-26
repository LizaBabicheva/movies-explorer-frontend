import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  const imageUrl = 'https://api.nomoreparties.co/';

  return (
    <ul className='movies-list'>
      {props.moviesList.map((movie, idx) => (
        idx < props.shownListSize ?
          <MoviesCard
            onMovieLike={props.onMovieLike}
            movie={movie}
            name={movie.nameRU}
            image={imageUrl + movie.image.url}
            duration={movie.duration}
            trailerLink={movie.trailerLink}
            // thumbnail= {imageUrl + movie.image.formats.thumbnail.url}
            thumbnail= {movie.thumbnail}
            key={movie.id} 
            onDelete={props.onDelete}
            isLiked={props.isLiked}/>
          : ''
      ))}
    </ul>
  )
}

export default MoviesCardList;