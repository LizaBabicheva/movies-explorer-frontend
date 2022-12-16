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
import Api from '../../utils/api';

function App() {
  const headerPathArray = ['/', '/movies', '/saved-movies', '/profile'];
  const footerPathArray = ['/', '/movies', '/saved-movies'];

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    new Api().getInitialMovies()
      .then((initialMovies) => {
        setMovies(initialMovies)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  // useEffect(() => {
  //   new Api().getInitialMovies()
  //     .then((initialMovies) => {
  //       setMovies(initialMovies)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }, [])

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
            movies={movies}
          />
        </Route>

        <Route path='/saved-movies'>
          <SavedMovies />
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
