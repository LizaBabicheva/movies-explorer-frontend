import './Profile.css';
// import { Link } from 'react-router-dom';

function Profile({ name, email }) {
  return (
    <section className='profile'>
      <div className='profile__info'>
        <h2 className='profile__greeting'>Привет,&nbsp;{name}!</h2>
        <form className='profile__info-form'>
          <label className='profile__input-label' htmlFor='profile-name'>Имя
            <input
              className='profile__input'
              type='text'
              id='profile-name'
              placeholder={name}>
            </input>
          </label>
          <span className='profile__input-error'></span>
          <label className='profile__input-label' htmlFor='profile-email'>E-mail
            <input
              className='profile__input'
              type='email'
              id='profile-email'
              placeholder={email}>
            </input>
          </label>
          <span className='profile__input-error'></span>

          <div className='profile__button-wrap'>
            <button className='profile__button profile__button_type_edit'>Редактировать</button>
            <button
              className='profile__button profile__button_type_signout'>
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </div>
    </section >
  )
}

export default Profile;