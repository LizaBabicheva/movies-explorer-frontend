import './Navigation.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

function Navigation() {

  const isMobile = useMediaQuery({ query: `(max-width: 860px)` });
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  function handleMenuClick() {
    setIsMobileMenu(!isMobileMenu);
  }

  return (
    <nav className='navigation'>
      <div className={`navigation__wrap ${isMobileMenu && 'navigation__wrap_type_mobile'}`}>
        <ul className='navigation__list'>
          {isMobile &&
            <li><NavLink exact to='/' className='navigation__link' activeClassName='navigation__link_active'>Главная</NavLink></li>
          }
          <li><NavLink to='/movies' className='navigation__link' activeClassName='navigation__link_active'>Фильмы</NavLink></li>
          <li><NavLink to='/saved-movies' className='navigation__link' activeClassName='navigation__link_active'>Сохранённые фильмы</NavLink></li>
        </ul>
        <Link className='navigation__link navigation__link_type_profile-button' to='/profile'>Аккаунт<div className='navigation__profile-icon'></div></Link>
        {isMobile &&
          <button
            className='navigation__button navigation__button_type_close'
            onClick={handleMenuClick}
            type='button'></button>
        }
      </div>
      {isMobile &&
        <button
          className='navigation__button navigation__button_type_menu'
          onClick={handleMenuClick}
          type='button'></button>}
    </nav>
  )
}

export default Navigation;