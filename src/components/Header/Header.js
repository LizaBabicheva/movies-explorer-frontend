// import React from 'react';
import logo from '../../images/logo.svg';
import { Route, Link } from 'react-router-dom';
import profileIcon from '../../images/profile-icon.svg';
import Navigation from '../Navigation';

function Header() {
  return (
    <header className='header'>
      <Link
        className='logo'
        to='/'>
        <img src={logo} alt='Лого'></img>
      </Link>

      {/* <Navigation /> */}

      <nav className='menu'>
        <a className='menu__link'>Регистрация</a>
        <button className='menu__link menu__button button'>Войти
        </button>
      </nav>

      {/* <button className='menu__profile-button'>Аккаунт
        <div className='menu__profile-icon'></div>
      </button> */}

    </header>
  )
}

export default Header;