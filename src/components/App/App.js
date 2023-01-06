import { useState, useEffect, useMemo } from 'react';
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

function App() {
  const headerPathArray = ['/', '/movies', '/saved-movies', '/profile'];
  const footerPathArray = ['/', '/movies', '/saved-movies'];
  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [shownListSize, setShownListSize] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [isSignup, setIsSignup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [isLiked, setIsLiked] = useState(false);
  const [moviesIsLoading, setMoviesIsLoading] = useState(false);
  const history = useHistory();
  const [savedMovieIdByMovieId, setSavedMovieIdByMovieId] = useState({});
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [infoTooltipText, setInfoTooltipText] = useState('');

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

  function loginCheck() {
    auth.getUserInfo()
      .then((res) => {
        // if (res.data._id) {
        if (res._id) {
          // setEmail(res.data.email);
          setLoggedIn(true);
          // history.push('/movies');
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
          setLoggedIn(true);
          openTooltip();
          setInfoTooltipText('Вы успешно зарегистрировались');
          history.push('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === 409) {
          openTooltip();
          setInfoTooltipText('Пользователь с таким email уже существует');
        }
        if (err === 500 || 400) {
          openTooltip();
          setInfoTooltipText('Что-то пошло не так, попробуйте еще раз');
        }
      })
  }

  function handleLogin(data) {
    auth.signin(data.email, data.password)
      .then((res) => {
        if (res.message === 'Успешная авторизация') {
          localStorage.setItem('token', res.token);
          // setEmail(data.email);
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
        debugger;
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
        debugger;
        // setEmail('');
        setLoggedIn(false);
        history.push('/signin');
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleProfileChange(userData) {
    mainApi.updateUserInfo(userData)
      .then((userInfo) => {
        // setCurrentUser(userInfo.data);
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
        if (err === 400 || 500) {
          openTooltip();
          setInfoTooltipText('Что-то пошло не так, попробуйте еще раз');
        }
      })
  }

  function openTooltip() {
    setInfoTooltipOpen(true);
  }

  function closeTooltip() {
    setInfoTooltipOpen(false);
  }

  //Поиск по фильмам
  function handleMoviesSearch(searchQuery) {
    setMoviesIsLoading(true);
    moviesApi.getInitialMovies()
      .then((initialMoviesData) => {
        const searchedMoviesData = initialMoviesData.filter(item => item.nameRU.toLowerCase().includes(searchQuery.toLowerCase()));
        // if (searchedMoviesData === 0) {
        //   return 'Ничего не найдено'
        // }
        setMoviesList(searchedMoviesData);
        // localStorage.setItem('movieSearchResult', JSON.stringify(searchedMoviesData));
        // localStorage.setItem('initialMovieSearchQuery', searchQuery);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setMoviesIsLoading(false);
        localStorage.setItem('initialMovieSearchQuery', searchQuery);
      })
  }

  function isLiked(movie) {
    // return moviesList.length > 0 && savedMoviesList.includes(savedMovie => savedMovie._id === movie.id );
    return savedMoviesList.some(
      savedMovie => savedMovie.movieId === movie.id
    );
  }

  // useEffect(() => {
  //   debugger;
  //   const savedFilteredMovies = JSON.parse(localStorage.getItem('movieSearchResult'));
  //   setMoviesList(savedFilteredMovies);
  // }, [loggedIn])

  function handleSavedMoviesSearch(searchQuery) {
    setMoviesIsLoading(true);
    setSavedMoviesList(savedMoviesList
      .filter(movie => movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())));
    localStorage.setItem('initialSavedMovieSearchQuery', searchQuery);
    setMoviesIsLoading(false);
  }

  // const [isChecked, setIsChecked] = useState(false);

  // function handleCheckbox() {
  //   setIsChecked(!isChecked);
  //   // localStorage.setItem('checkboxState', JSON.stringify(isChecked));
  // }


  useEffect(() => {
    mainApi.getSavedMovies()
      .then((savedMoviesData) => {
        setSavedMoviesList(savedMoviesData.movies);

        setSavedMovieIdByMovieId(savedMoviesData.movies.reduce(
          (result, movie) => Object.assign(result, { [movie.movieId]: movie._id }), {}));

        // setSavedMovieIdByMovieId(
        //   new Map(
        //   savedMoviesData.movies.map(movie => [
        //   movie.movieId, movie._id
        // ])));
      })
      .catch((err) => {
        console.log(err);
      })
  }, [loggedIn])


  // useEffect(() => {
  //   debugger;
  //   savedMoviesList.forEach(savedMovie => moviesList.forEach(movie => {
  //     debugger;
  //     if (movie.id === savedMovie.movieId) {
  //       movie.setIsLiked(true);
  //     }
  //   }));
  // }, [savedMoviesList]);


  // useEffect(() => {
  //   debugger;
  //   if (moviesList.length > 0 && moviesList.includes(movie => movie.id === savedMoviesList.map(item => item.movieId))) {
  //     setIsLiked(true);
  //   }
  // }, [])


  function handleMovieSave(movie) {
    mainApi.addNewMovie(movie)
      .then((newMovie) => {
        // setSavedMoviesList([newMovie.movie, ...savedMoviesList.movies]);
        // moviesList((state) => state.map((m) => m.id === movie.movieId ? newMovie.movie : m));
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
                // isChecked={isChecked}
                // onCheckbox={handleCheckbox}
                onDelete={handleMovieDelete}
                savedMovieIdByMovieId={savedMovieIdByMovieId}
                setMoviesList={setMoviesList}
              >
              </ProtectedRoute>

              <ProtectedRoute
                component={SavedMovies}
                path='/saved-movies' x
                loggedIn={loggedIn}
                moviesList={savedMoviesList}
                shownListSize={shownListSize}
                // onLoadMore={onLoadMore}
                onDelete={handleMovieDelete}
                // isChecked={isChecked}
                // onCheckbox={handleCheckbox}
                onSearch={handleSavedMoviesSearch}>
              </ProtectedRoute>

              <ProtectedRoute
                component={Profile}
                path='/profile'
                loggedIn={loggedIn}
                // currentUser={currentUser}
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