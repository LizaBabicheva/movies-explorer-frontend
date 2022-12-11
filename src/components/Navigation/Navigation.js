import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className='navigation'>
      <Link className='navigation__link' to='/movies'>Фильмы</Link>
      <Link className='navigation__link' to='/saved-movies'>Сохранённые фильмы</Link>
      <Link className='navigation__link navigation__link_type_profile-button' to='/profile'>Аккаунт
        <div className='navigation__profile-icon'></div>
      </Link>
    </nav>
  )
}

export default Navigation;