import { useEffect, useContext } from 'react';
import './Profile.css';
import useForm from '../../hooks/useForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ onSignout, onProfileChange }) {

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser.name) {
      processChanges("name", currentUser.name);
      processChanges("email", currentUser.email);
    }
  }, [currentUser]);

  const stateSchema = {
    name: { value: '', error: '' },
    email: { value: '', error: '' },
  };

  const validationStateSchema = {
    name: {
      required: true,
      validator: {
        regEx: /^[a-zA-Zа-яА-Я\- ]+$/,
        error: 'Поле может содержать только латиницу, кириллицу, пробел или дефис',
      },
    },
    email: {
      required: true,
      validator: {
        regEx: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
        error: 'Поле должно соответствовать шаблону электронной почты',
      },
    },
  };

  function onSubmitForm(state) {
    onProfileChange({
      name: state.name.value,
      email: state.email.value,
    });
  }

  const { state, handleOnChange, handleOnSubmit, disable, processChanges } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  );

  return (
    <section className='profile'>
      <div className='profile__info'>
        <h2 className='profile__greeting'>Привет,&nbsp;{currentUser.name}!</h2>
        <form className='profile__info-form' onSubmit={handleOnSubmit}>
          <label className='profile__input-label' htmlFor='profile-name'>Имя
            <input
              className={`profile__input ${state.name.error && 'profile__input_type_error'}`}
              type='text'
              minLength='2'
              maxLength='30'
              required
              id='profile-name'
              name='name'
              placeholder='Введите имя'
              value={state.name.value}
              onChange={handleOnChange}>
            </input>
          </label>
          <span className='profile__input-error'>{state.name.error}</span>
          <label className='profile__input-label' htmlFor='profile-email'>E-mail
            <input
              className={`profile__input ${state.email.error && 'profile__input_type_error'}`}
              type='email'
              required
              id='profile-email'
              name='email'
              placeholder='Введите email'
              value={state.email.value}
              onChange={handleOnChange}>
            </input>
          </label>
          <span className='profile__input-error'>{state.email.error}</span>

          <div className='profile__button-wrap'>
            <button
              className={`profile__button profile__button_type_edit ${disable && 'profile__button_disabled'}`}
              type='submit'
              disabled={disable}>
              Редактировать</button>
          </div>
        </form>
        <button
          className='profile__button profile__button_type_signout'
          onClick={onSignout}>
          Выйти из аккаунта
        </button>
      </div>
    </section >
  )
}

export default Profile;