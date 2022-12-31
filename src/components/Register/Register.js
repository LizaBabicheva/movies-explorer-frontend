// import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';
import useForm from '../../hooks/useForm';

function Register({ onSignup }) {

  // Define your state schema
  const stateSchema = {
    name: { value: '', error: '' },
    email: { value: '', error: '' },
    password: { value: '', error: '' },
  };
  // Define your validationStateSchema
  // Note: validationStateSchema and stateSchema property
  // should be the same in-order validation works!
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
    password: {
      required: true,
      validator: {
        regEx: /^[^\sА-Яа-я]+$/,
        error: 'Пароль может содержать только символы, цифры и латинские буквы.',
      },
    },
  };

  function onSubmitForm(state) {
    onSignup({
      name: state.name.value,
      email: state.email.value,
      password: state.password.value
    });
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  );

  return (
    <section className='register'>
      <Link className='register__logo' to='/'><img src={logo} alt='Лого'></img></Link>
      <h2 className='register__title'>Добро пожаловать!</h2>

      <form className='register__form' onSubmit={handleOnSubmit}>
        <label
          className='register__label'
          htmlFor='name'>Имя</label>
        <input
          className={`register__input ${state.name.error && 'register__input_type_error'}`}
          type='text'
          minLength='2'
          maxLength='30'
          required
          id='name'
          name='name'
          value={state.name.value}
          onChange={handleOnChange}>
        </input>
        <span className='register__error'>{state.name.error}</span>

        <label
          className='register__label'
          htmlFor='email'>E-mail</label>
        <input
          className={`register__input ${state.email.error && 'register__input_type_error'}`}
          type='email'
          required
          id='email'
          name='email'
          value={state.email.value}
          onChange={handleOnChange}>
        </input>
        <span className='register__error'>{state.email.error}</span>

        <label
          className='register__label'
          htmlFor='password'>Пароль</label>
        <input
          className={`register__input ${state.password.error && 'register__input_type_error'}`}
          type='password'
          required
          id='password'
          name='password'
          value={state.password.value}
          onChange={handleOnChange}>
        </input>
        <span className='register__error'>{state.password.error}</span>

        <button
          className={`register__submit ${disable && 'register__submit_disabled'}`}
          type='submit'
          disabled={disable}
          // title='Заполните форму'
          >
          Зарегистрироваться
        </button>
      </form >

      <div className='register__login'>
        <p className='register__login-text'>Уже зарегистрированы?&nbsp;</p>
        <Link to='/signin' className='register__login-link'>Войти</Link>
      </div>
    </section >
  )
}

export default Register;