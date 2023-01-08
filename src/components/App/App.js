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
        setSavedMoviesList(savedMoviesData.movies);
        setSavedMovieIdByMovieId(savedMoviesData.movies.reduce(
          (result, movie) => Object.assign(result, { [movie.movieId]: movie._id }), {}));
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
          setInfoTooltipText('Вы успешно зарегистрировались');
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
          setInfoTooltipText('Пользователь с таким email уже существует');
        }
        if (err === 400) {
          openTooltip();
          setInfoTooltipText('Проверьте корректность введенных данных');
        }
        if (err === 500) {
          openTooltip();
          setInfoTooltipText('Что-то пошло не так, попробуйте еще раз');
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
          setInfoTooltipText('Вы ввели неправильный email или пароль');
        }
        if (err === 500) {
          openTooltip();
          setInfoTooltipText('Что-то пошло не так, попробуйте еще раз');
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
    mainApi.updateUserInfo(userData)
      .then((userInfo) => {
        setCurrentUser(userInfo.data);
        openTooltip();
        setInfoTooltipText('Вы успешно изменили данные');
      })
      .catch((err) => {
        console.log(err);
        if (err === 409) {
          openTooltip();
          setInfoTooltipText('Пользователь с таким email уже существует');
        }
        if (err === 400) {
          openTooltip();
          setInfoTooltipText('Проверьте корректность введенных данных');
        }
        if (err === 500) {
          openTooltip();
          setInfoTooltipText('Что-то пошло не так, попробуйте еще раз');
        }
      })
  }

  function handleMoviesSearch(searchQuery) {
    setMoviesIsLoading(true);
    moviesApi.getInitialMovies()
      .then((initialMoviesData) => {
        const searchedMoviesData = filterMovies(initialMoviesData, searchQuery);
        setMoviesList(searchedMoviesData);
        localStorage.setItem('movieSearchResult', JSON.stringify(searchedMoviesData));
        if (searchedMoviesData.length === 0) {
          const message = 'Ничего не найдено';
          localStorage.setItem('notFoundMessage', message);
          setNotFoundMessage(message);
        }
      })
      .catch((err) => {
        console.log(err);
        setNotFoundMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
      })
      .finally(() => {
        localStorage.setItem('initialMovieSearchQuery', searchQuery);
        setMoviesIsLoading(false);
      })
  }

  function isLiked(movie) {
    return savedMoviesList.some(
      savedMovie => savedMovie.movieId === movie.id
    );
  }

  function handleSavedMoviesSearch(searchQuery) {
    setMoviesIsLoading(true);
    const searchedMoviesData = filterMovies(savedMoviesList, searchQuery);
    setSavedMoviesList(searchedMoviesData);
    setMoviesIsLoading(false);
  }

  function handleMovieSave(movie) {
    mainApi.addNewMovie(movie)
      .then((newMovie) => {
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
    return window.screen.width < 480 ? 5 : (window.screen.width < 768 ? 8 : 12)
  }

  function getLoadMoreSize() {
    return window.screen.width < 480 ? 2 : (window.screen.width < 768 ? 2 : 3)
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
                onSearch={handleSavedMoviesSearch}>
              </ProtectedRoute>

              <ProtectedRoute
                component={Profile}
                path='/profile'
                loggedIn={loggedIn}
                onSignout={handleSignOut}
                onProfileChange={handleProfileChange}>
              </ProtectedRoute>

              <Route path='/signin'>
                <Login
                  onLogin={handleLogin}
                />
              </Route>

              <Route path='/signup'>
                <Register
                  onSignup={handleSignup}
                />
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