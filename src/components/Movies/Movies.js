import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList
        movies={props.movies} />
      <button className='movies__more-button' type='button' aria-label='Загрузить еще'>Ещё</button>
    </section>
  )
}

export default Movies;