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

  return (
    <div className="root">
      <Header />

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
          <Profile />
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
      <Footer />
    </div>
  );
}

export default App;
