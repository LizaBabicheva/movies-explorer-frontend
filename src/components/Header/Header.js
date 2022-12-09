// import React from 'react';
import logo from '../../images/logo.svg';
import { Route, Link } from 'react-router-dom';
import './Header.css';
import profileIcon from '../../images/profile-icon.svg';
import Navigation from '../Navigation/Navigation';

function Header() {
  return (
    <header className='header'>
      <Link
        className='header__logo'
        to='/'>
        <img src={logo} alt='Лого'></img>
      </Link>

      {/* <Navigation /> */}

      <nav className='header__menu'>
        <Link className='header__menu-link' to='/signup'>Регистрация</Link>
        <button className='header__menu-button'>Войти
        </button>
      </nav>

      {/* <button className='header__profile-button'>Аккаунт
        <div className='header__profile-icon'></div>
      </button> */}

    </header>
  )
}

export default Header;