import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Error from '../Error/Error';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { filterMovies } from '../../utils/utils';
import {
  DESKTOP_INITIAL_CARDS_NUMBER,
  TABLET_INITIAL_CARDS_NUMBER,
  MOBILE_INITIAL_CARDS_NUMBER,
  MOBILE_WINDOW_SIZE,
  TABLET_WINDOW_SIZE,
  DESKTOP_LOAD_MORE_CARDS,
  TABLET_LOAD_MORE_CARDS,
  MOBILE_LOAD_MORE_CARDS,
  CONFLICT_ERROR_MESSAGE,
  BAD_REQUEST_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  WRONG_AUTH_DATA_ERROR_MESSAGE,
  SUCCESS_REGISTER_MESSAGE,
  SUCCESS_DATA_CHANGE_MESSAGE,
  NOTHING_FOUND_MESSAGE,
  SERVER_ERROR_MESSAGE
} from '../../utils/constants';

function App() {
  const headerPathArray = ['/', '/movies', '/saved-movies', '/profile'];
  const footerPathArray = ['/', '/movies', '/saved-movies'];
  const history = useHistory();
  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [shownListSize, setShownListSize] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [isSignup, setIsSignup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [moviesIsLoading, setMoviesIsLoading] = useState(false);
  const [savedMovieIdByMovieId, setSavedMovieIdByMovieId] = useState({});
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [infoTooltipText, setInfoTooltipText] = useState('');
  const [notFoundMessage, setNotFoundMessage] = useState('');

  useEffect(() => {
    loginCheck();
  }, [])

  useEffect(() => {
    if (isSignup && loggedIn) {
      history.push('/movies')
    }
  }, [isSignup, loggedIn, history])

  useEffect((userData) => {
    if (loggedIn) {
      mainApi.getUserInfo(userData)
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn])

  useEffect(() => {
    mainApi.getSavedMovies()
      .then((savedMoviesData) => {
        setSavedMovieIdByMovieId(savedMoviesData.movies.reduce(
          (result, movie) => Object.assign(result, { [movie.movieId]: movie._id }), {}));
        setSavedMoviesList(savedMoviesData.movies);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [loggedIn])

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

  function openTooltip() {
    setTimeout(() => { setInfoTooltipOpen(false) }, 5000)
    setInfoTooltipOpen(true);
  }

  function closeTooltip() {
    setInfoTooltipOpen(false);
  }

  function loginCheck() {
    auth.getUserInfo()
      .then((res) => {
        if (res._id) {
          setLoggedIn(true);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      })
  }

  function handleSignup({ name, email, password }) {
    auth.signup(name, email, password)
      .then((res) => {
        if (res) {
          setIsSignup(true);
          openTooltip();
          setInfoTooltipText(SUCCESS_REGISTER_MESSAGE);
          handleLogin({
            email: email,
            password: password
          })
          history.push('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === 409) {
          openTooltip();
          setInfoTooltipText(CONFLICT_ERROR_MESSAGE);
        }
        if (err === 400) {
          openTooltip();
          setInfoTooltipText(BAD_REQUEST_ERROR_MESSAGE);
        }
        if (err === 500) {
          openTooltip();
          setInfoTooltipText(INTERNAL_SERVER_ERROR_MESSAGE);
        }
      })
  }

  function handleLogin(data) {
    auth.signin(data.email, data.password)
      .then((res) => {
        if (res.message === 'Успешная авторизация') {
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === 401) {
          openTooltip();
          setInfoTooltipText(WRONG_AUTH_DATA_ERROR_MESSAGE);
        }
        if (err === 500) {
          openTooltip();
          setInfoTooltipText(INTERNAL_SERVER_ERROR_MESSAGE);
        }
      })
  }

  function handleSignOut() {
    auth.signout()
      .then(() => {
        setLoggedIn(false);
        history.push('/');
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleProfileChange(userData) {
    if (userData.name === currentUser.name && userData.email === currentUser.email) {
      return;
    }
    mainApi.updateUserInfo(userData)
      .then((userInfo) => {
        setCurrentUser(userInfo.data);
        openTooltip();
        setInfoTooltipText(SUCCESS_DATA_CHANGE_MESSAGE);
      })
      .catch((err) => {
        console.log(err);
        if (err === 409) {
          openTooltip();
          setInfoTooltipText(CONFLICT_ERROR_MESSAGE);
        }
        if (err === 400) {
          openTooltip();
          setInfoTooltipText(BAD_REQUEST_ERROR_MESSAGE);
        }
        if (err === 500) {
          openTooltip();
          setInfoTooltipText(INTERNAL_SERVER_ERROR_MESSAGE);
        }
      })
  }

  function fetchMovies() {
    if (localStorage.initialMoviesData) {
      return new Promise((res, rej) => {
        res(JSON.parse(localStorage.initialMoviesData));
      });
    }

    const initMoviesPromise = moviesApi.getInitialMovies();
    initMoviesPromise
      .then(initialMoviesData => {
        localStorage.setItem('initialMoviesData', JSON.stringify(initialMoviesData));
      });
    return initMoviesPromise;
  }

  function handleMoviesSearch(searchQuery) {
    setMoviesIsLoading(true);
    fetchMovies().then((initialMoviesData) => {
      const searchedMoviesData = filterMovies(initialMoviesData, searchQuery);
      setMoviesList(searchedMoviesData);
      localStorage.setItem('movieSearchResult', JSON.stringify(searchedMoviesData));
      if (searchedMoviesData.length === 0) {
        localStorage.setItem('notFoundMessage', NOTHING_FOUND_MESSAGE);
        setNotFoundMessage(NOTHING_FOUND_MESSAGE);
      }
    }
    ).catch((err) => {
      console.log(err);
      setNotFoundMessage(SERVER_ERROR_MESSAGE)

    }).finally(() => {
      localStorage.setItem('initialMovieSearchQuery', searchQuery);
      setMoviesIsLoading(false);
    });
  }

  function isLiked(movie) {
    return savedMoviesList.some(
      savedMovie => savedMovie.movieId === movie.id
    );
  }

  function handleMovieSave(movie) {
    mainApi.addNewMovie(movie)
      .then((newMovie) => {
        const updatedMoviesById = Object.assign(savedMovieIdByMovieId, { [newMovie.movie.movieId]: newMovie.movie._id }, {});
        setSavedMovieIdByMovieId(updatedMoviesById);
        setSavedMoviesList([newMovie.movie, ...savedMoviesList]);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleMovieDelete(movieId) {
    mainApi.deleteMovieApi(movieId)
      .then(() => {
        setSavedMoviesList((movies) => movies.filter(item => item._id !== movieId));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function getInitialSize() {
    return window.screen.width < MOBILE_WINDOW_SIZE ? MOBILE_INITIAL_CARDS_NUMBER : (window.screen.width < TABLET_WINDOW_SIZE ? TABLET_INITIAL_CARDS_NUMBER : DESKTOP_INITIAL_CARDS_NUMBER)
  }

  function getLoadMoreSize() {
    return window.screen.width < MOBILE_WINDOW_SIZE ? MOBILE_LOAD_MORE_CARDS : (window.screen.width < TABLET_WINDOW_SIZE ? TABLET_LOAD_MORE_CARDS : DESKTOP_LOAD_MORE_CARDS)
  }

  function handleResize() {
    const initialSize = getInitialSize();
    const pageSize = getLoadMoreSize();
    setShownListSize(initialSize + ((pageCount - 1) * pageSize));
  }

  function onLoadMore() {
    setPageCount(pageCount + 1);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        {isLoading ?
          <Preloader /> :
          <>
            <Route exact path={headerPathArray}>
              <Header
                loggedIn={loggedIn} />
            </Route>

            <Switch>
              <Route exact path='/'>
                <Main />
              </Route>

              <ProtectedRoute
                component={Movies}
                path='/movies'
                moviesList={moviesList}
                shownListSize={shownListSize}
                onLoadMore={onLoadMore}
                loggedIn={loggedIn}
                onMovieLike={handleMovieSave}
                onSearch={handleMoviesSearch}
                isLiked={isLiked}
                moviesIsLoading={moviesIsLoading}
                onDelete={handleMovieDelete}
                savedMovieIdByMovieId={savedMovieIdByMovieId}
                setMoviesList={setMoviesList}
                notFoundMessage={notFoundMessage}
                setNotFoundMessage={setNotFoundMessage}>
              </ProtectedRoute>

              <ProtectedRoute
                component={SavedMovies}
                path='/saved-movies'
                loggedIn={loggedIn}
                moviesList={savedMoviesList}
                shownListSize={shownListSize}
                onDelete={handleMovieDelete}
                setSavedMoviesList={setSavedMoviesList}
                setMoviesIsLoading={setMoviesIsLoading}
              >
              </ProtectedRoute>

              <ProtectedRoute
                component={Profile}
                path='/profile'
                loggedIn={loggedIn}
                onSignout={handleSignOut}
                onProfileChange={handleProfileChange}>
              </ProtectedRoute>

              <Route path='/signin'>
                {loggedIn
                  ? <Redirect to='/' />
                  : <Login
                    onLogin={handleLogin} />}
              </Route>

              <Route path='/signup'>
                {loggedIn
                  ? <Redirect to='/' />
                  : <Register
                    onSignup={handleSignup} />}
              </Route>

              <Route path='/404'>
                <Error />
              </Route>

              <Redirect from='*' to='/404' />

            </Switch>

            <Route exact path={footerPathArray}>
              <Footer />
            </Route>

            <InfoTooltip
              isSignup={isSignup}
              loggedIn={loggedIn}
              InfoTooltipText={infoTooltipText}
              isOpen={infoTooltipOpen}
              onClose={closeTooltip} />
          </>
        }
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;