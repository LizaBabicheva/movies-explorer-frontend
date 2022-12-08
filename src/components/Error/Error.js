import { Link } from 'react-router-dom';
import './Error.css';

function Error() {
  return (
    <section className='error'>
      <h2 className='error__code'>404</h2>
      <p className='error__description'>Страница не найдена</p>
      <Link
        className='error__link'
        to='/'>
        Назад
      </Link>
    </section>
  )
}

export default Error;