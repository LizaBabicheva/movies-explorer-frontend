import React from 'react';
import { Route, Switch } from 'react-router-dom';
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

function App() {
  const headerPathArray = ['/', '/movies', '/saved-movies', '/profile'];
  const footerPathArray = ['/', '/movies', '/saved-movies'];

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
          />
        </Route>

        <Route path='/saved-movies'>
          <SavedMovies />
        </Route>

        <Route path='/profile'>
          <Profile
            name='Виталий'
            email='pochta@yandex.ru' />
        </Route>

        <Route path='/signin'>
          <Login />
        </Route>

        <Route path='/signup'>
          <Register />
        </Route>

        <Route path='*'>
          <Error />
        </Route>

      </Switch>

      <Route exact path={footerPathArray}>
        <Footer />
      </Route>
    </div>
  );
}

export default App;
