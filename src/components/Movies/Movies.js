import { useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
// import moviesApi from '../../utils/MoviesApi';


function Movies(props) {

  return (
    <section className="movies">
      <SearchForm
        onSearch={props.onSearch}
        isChecked={props.isChecked}
        onCheckbox={props.onCheckbox}
      />

      {props.moviesIsLoading
        ? <Preloader />
        : <> 
          <MoviesCardList
            onMovieLike={props.onMovieLike}
            moviesList={props.moviesList}
            shownListSize={props.shownListSize}
            onDelete={props.onDelete}
            isLiked={props.isLiked}
            isChecked={props.isChecked} />

          <Route path='/movies'>
            <button className='movies__more-button' type='button' aria-label='Загрузить еще' onClick={props.onLoadMore}>Ещё</button>
          </Route>
        </>
      }
    </section>
  )
}

export default Movies;