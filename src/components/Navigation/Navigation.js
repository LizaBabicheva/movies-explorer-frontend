import './Navigation.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

function Navigation() {

  const isMobile = useMediaQuery({ query: `(max-width: 860px)` });
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  function handleMenuClick() {
    setIsMobileMenu(!isMobileMenu);
  }

  return (
    <nav className='navigation'>
      <div className={isMobileMenu ? 'navigation__wrap navigation__wrap_type_mobile' : 'navigation__wrap'}>
        <ul className='navigation__list'>
          {isMobile &&
            <li><Link className='navigation__link navigation__link_active' to='/'>Главная</Link></li>}
          <li><Link className='navigation__link' to='/movies'>Фильмы</Link></li>
          <li><Link className='navigation__link' to='/saved-movies'>Сохранённые фильмы</Link></li>
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