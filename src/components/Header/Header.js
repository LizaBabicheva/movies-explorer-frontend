import { Route, Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header() {
  const location = useLocation();

  const navPathArray = ['/movies', '/saved-movies', '/profile'];

  return (
    <header className={`header ${location.pathname === '/' && 'header_type_main'}`}>

      <Link className='header__logo header__menu-link' to='/'>
        <img src={logo} alt='Лого'></img>
      </Link>

      <Route exact path='/'>
        <nav className='header__menu'>
          <Link className='header__menu-link' to='/signup'>Регистрация</Link>
          <Link className='header__menu-link header__menu-link_type_button' to='/signin'>Войти</Link>
        </nav>
      </Route>

      <Route path={navPathArray}>
        <Navigation />
      </Route>

    </header>
  )
}

export default Header;