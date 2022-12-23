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
import SavedMovies from '../Movies/Movies';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';

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
  const [isLiked, setIsLiked] = useState(false);
  const history = useHistory();



  //Токен, удалить при переходе на куки
  // useEffect(() => {
  //   tokenCheck()
  // }, [])

  // useEffect(() => {
  //   console.log("logged in value:" + loggedIn);
  // }, [loggedIn])

  // function tokenCheck() {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     auth.getToken(token)
  //       .then((res) => {
  //         if (res) {
  //           // setEmail(res.data.email);
  //           setLoggedIn(true);
  //           // history.push('/');
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //   }
  // }

  // function handleSignOut() {
  //   localStorage.removeItem('token');
  //   debugger;
  //   setLoggedIn(false);
  //   history.push('/signin');
  // }
  //

  useEffect(() => {
    loginCheck();
  }, [])

  useEffect((userData) => {
    if (loggedIn) {
      mainApi.getUserInfo(userData)
        .then((userInfo) => {
          // setCurrentUser(userInfo.data);
          setCurrentUser(userInfo);
          setIsLoading(false);
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
          // history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleSignup({ name, email, password }) {
    debugger;
    auth.signup(name, email, password)
      .then((res) => {
        if (res) {
          setIsSignup(true);
          // handleInfoTooltip();
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err);
        // handleInfoTooltip();
      })
  }

  function handleLogin(data) {
    auth.signin(data.email, data.password)
      .then((res) => {
        if (res.message === 'Успешная авторизация') {
          // if (res.token) { //Удалить когда будут куки
          localStorage.setItem('token', res.token);
          // setEmail(data.email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleSignOut() {
    auth.signout()
      .then(() => {
        debugger;
        // setEmail('');
        setLoggedIn(false);
        history.push('/signin');
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
      })
      .catch((err) => {
        console.log(err);
      })
  }




  // useEffect((initialMoviesData) => {
  // if (loggedIn) {
  // if (moviesList.length === 0) {
  //   showPreloader()
  // }

  // function onSearch(initialMoviesData) {
  //   moviesApi.getInitialMovies(initialMoviesData)
  //   .then((initialMoviesData) => {
  //     setMoviesList(initialMoviesData)
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // }

  useEffect((initialMoviesData) => {
    moviesApi.getInitialMovies(initialMoviesData)
      .then((initialMoviesData) => {
        setMoviesList(initialMoviesData)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [loggedIn])

  useEffect((initialSavedMoviesData) => {
    mainApi.getSavedMovies(initialSavedMoviesData)
      .then((initialSavedMoviesData) => {
        setSavedMoviesList(initialSavedMoviesData.movies)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [loggedIn])

  function handleMovieLike(movie) {
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


  function handleMovieDelete(movie) {
    debugger;
    mainApi.deleteMovieApi(movie._id)
      .then(() => {
        setSavedMoviesList((movies) => movies.filter(item => item._id !== movie._id));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // const isLiked = card.likes.some(i => i === currentUser._id);
  // api.changeLikeApi(card._id, !isLiked)
  //   .then((newCard) => {
  //     setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })




  // const isLiked = card.likes.some(i => i === currentUser._id);
  // mainApi.changeLikeApi(card._id, !isLiked)
  //   mainApi.changeLikeApi(movie._id)
  //     .then((newCard) => {
  //       setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }




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

              {/* <Route path='/movies'>
            <Movies
              moviesList={moviesList}
              shownListSize={shownListSize}
              onLoadMore={onLoadMore}
            />
          </Route> */}

              <ProtectedRoute
                component={Movies}
                path='/movies'
                moviesList={moviesList}
                shownListSize={shownListSize}
                onLoadMore={onLoadMore}
                loggedIn={loggedIn}
                onMovieLike={handleMovieLike}
                isLiked={isLiked}>
              </ProtectedRoute>

              <Route path='/saved-movies'>
                <SavedMovies
                  moviesList={savedMoviesList}
                  shownListSize={shownListSize}
                  onLoadMore={onLoadMore}
                  onDelete={handleMovieDelete} />
              </Route>

              <Route path='/profile'>
                <Profile
                  currentUser={currentUser}
                  onSignout={handleSignOut}
                  onProfileChange={handleProfileChange}

                />
              </Route>

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
          </>
        }
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;