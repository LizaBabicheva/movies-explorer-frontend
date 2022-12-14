import { useState, useEffect } from 'react';
import './Profile.css';

function Profile(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setName(props.name);
    setEmail(props.email)
  }, []);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   onUpdateUser({
  //     name,
  //     email: email,
  //   });
  // }

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
              placeholder='Введите имя'
              value={name}
              onChange={handleNameChange}>
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
              onChange={handleEmailChange}>
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