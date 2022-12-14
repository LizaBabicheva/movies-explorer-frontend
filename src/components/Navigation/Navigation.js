import './Navigation.css';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

function Navigation() {

  const isMobile = useMediaQuery({ query: `(max-width: 860px)` });

  const navRef = useRef();
  function showNavBar() {
    navRef.current.classList.toggle('navigation__wrap_type_mobile');
  }

  // const [isClicked, setIsClicked] = useState(false);

  // function handleMenuClick() {
  //   setIsClicked(true);
  // }

  return (
    <nav className='navigation'>
      <div className='navigation__wrap'
        ref={navRef}>
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
            onClick={showNavBar}
            type='button'></button>
        }
      </div>
      {isMobile &&
        <button
          className='navigation__button navigation__button_type_menu'
          onClick={showNavBar}
          type='button'></button>}
    </nav>
  )
}

export default Navigation;