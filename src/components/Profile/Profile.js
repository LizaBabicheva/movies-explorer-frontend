import './Profile.css';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <section className='profile'>
      <h2 className='profile__greeting'>Привет, Виталий!</h2>
{/* Форма или просто текст? */}
      <div className='profile__info'>
        <p className='profile__info-field'>Имя</p>
        <p className='profile__user-info'>Виталий</p>
        <p className='profile__info-field'>E-mail</p>
        <p className='profile__user-info'>pochta@yandex.ru</p>
      </div>

      <button className='profile__edit'>Редактировать</button>
      <Link
        className='profile__signout'
        to='/signout'>
        Выйти из аккаунта
      </Link>
    </section>
  )
}

export default Profile;