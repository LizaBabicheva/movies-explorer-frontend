import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className='navigation'>
      <Link className='navigation__link' to=''>Фильмы</Link>
      <Link className='navigation__link' to=''>Сохранённые фильмы</Link>
    </nav>
  )
}

export default Navigation;