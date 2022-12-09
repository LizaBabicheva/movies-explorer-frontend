import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <div className='movies-list'></div>
        <ul>
          <li className='movie-card'>
            <img className='movie-card__img' alt='' src=''></img>
            <div className='movie-card__description'>
              <h2 className='movie-card__title'></h2>
              <p className='movie-card__duration'></p>
              <button className='movie-card__like-button' type="button" aria-label="Нравится"></button>
            </div>
          </li>
        </ul>

        <button className='movies__more-button'>Ещё</button>
    </section>
  )
}

export default Movies;