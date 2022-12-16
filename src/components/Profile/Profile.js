import { useState, useEffect } from 'react';
import './Profile.css';

import { userContext } from '../../contexts/CurrentUserContext';

function Profile() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setName(userContext.name);
    setEmail(userContext.email)
  }, []);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  return (
    <section className='profile'>
      <div className='profile__info'>
        <h2 className='profile__greeting'>Привет,&nbsp;{userContext.name}!</h2>
        <form className='profile__info-form'>
          <label className='profile__input-label' htmlFor='profile-name'>Имя
            <input
              className='profile__input'
              type='text'
              minLength='2'
              maxLength='30'
              id='profile-name'
              placeholder='Введите имя'
              value={name}
              onChange={handleNameChange}
              required>
            </input>
          </label>
          <span className='profile__input-error'></span>
          <label className='profile__input-label' htmlFor='profile-email'>E-mail
            <input
              className='profile__input'
              type='email'
              id='profile-email'
              placeholder='Введите email'
              value={email}
              onChange={handleEmailChange}
              required>
            </input>
          </label>
          <span className='profile__input-error'></span>

          <div className='profile__button-wrap'>
            <button
              className='profile__button profile__button_type_edit'
              type='submit'>
              Редактировать</button>
            <button
              className='profile__button profile__button_type_signout'
              type='submit'>
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </div>
    </section >
  )
}

export default Profile;