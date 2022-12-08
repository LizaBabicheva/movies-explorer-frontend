import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Error from '../Error/Error';

function App() {
  return (
    <div className="root">
      <Header />
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>

        {/* <Route path='/movies'>
      </Route> */}

        {/* <Route path='/saved-movies'>
      </Route> */}

        {/* <Route path='/profile'>
      </Route> */}

        {/* <Route path='/signin'>
      </Route> */}

        {/* <Route path='/signup'>
      </Route> */}

        <Route path="*">
          <Error />
        </Route>

      </Switch>
      <Footer />
    </div>
  );
}

export default App;
