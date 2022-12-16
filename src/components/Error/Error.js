import { useHistory } from 'react-router-dom';
import './Error.css';

function Error() {

  const history = useHistory();

  return (
    <section className='error'>
      <h2 className='error__code'>404</h2>
      <p className='error__description'>Страница не найдена</p>
      <button
        className='error__button'
        onClick={() => history.goBack()}>
        Назад
      </button>
    </section>
  )
}

export default Error;