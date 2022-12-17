import { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Error from '../Error/Error';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/Movies';
import faker from '../../utils/faker';

function App() {
  const headerPathArray = ['/', '/movies', '/saved-movies', '/profile'];
  const footerPathArray = ['/', '/movies', '/saved-movies'];
  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [shownListSize, setShownListSize] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    setMoviesList(faker)
  }, [])

  useEffect(() => {
    setSavedMoviesList(faker.filter(i => i.saved === true))
  }, [])

  function getInitialSize() {
    return window.screen.width < 680 ? 5 : (window.screen.width < 860 ? 8 : 12)
  }

  function getLoadMoreSize() {
    return window.screen.width < 680 ? 1 : (window.screen.width < 860 ? 2 : 3)
  }

  function handleResize() {
    const initialSize = getInitialSize();
    const pageSize = getLoadMoreSize();
    setShownListSize(initialSize + ((pageCount - 1) * pageSize));
  }

  function onLoadMore() {
    setPageCount(pageCount + 1);
  }

  useEffect(() => {
    handleResize();
  }, [pageCount])

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="root">

      <Route exact path={headerPathArray}>
        <Header />
      </Route>

      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>

        <Route path='/movies'>
          <Movies
            moviesList={moviesList}
            shownListSize={shownListSize}
            onLoadMore={onLoadMore} />
        </Route>

        <Route path='/saved-movies'>
          <SavedMovies
            moviesList={savedMoviesList} />
        </Route>

        <Route path='/profile'>
          <Profile />
        </Route>

        <Route path='/signin'>
          <Login />
        </Route>

        <Route path='/signup'>
          <Register />
        </Route>

        <Route path='/404'>
          <Error />
        </Route>

        <Redirect from='*' to='/404' />

      </Switch>

      <Route exact path={footerPathArray}>
        <Footer />
      </Route>
    </div>
  );
}

export default App;