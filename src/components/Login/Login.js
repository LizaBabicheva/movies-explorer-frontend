// import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.svg';
import useForm from '../../utils/useForm';

function Login({ onLogin }) {

  const stateSchema = {
    email: { value: '', error: '' },
    password: { value: '', error: '' },
  };

  const validationStateSchema = {
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
    onLogin({
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
    <section className='login'>
      <Link className='login__logo' to='/'><img src={logo} alt='Лого'></img></Link>
      <h2 className='login__title'>Рады видеть!</h2>

      <form className='login__form' onSubmit={handleOnSubmit}>
        <label
          className='login__label'
          htmlFor='email'>E-mail</label>
        <input
          className={`login__input ${state.email.error && 'login__input_type_error'}`}
          type='email'
          id='email'
          name='email'
          required
          value={state.email.value}
          onChange={handleOnChange}>
        </input>
        <span className='login__error'>{state.email.error}</span>

        <label
          className='login__label'
          htmlFor='password'>Пароль</label>
        <input
          className='login__input'
          type='password'
          id='password'
          name='password'
          required
          value={state.password.value}
          onChange={handleOnChange}>
        </input>
        <span className='login__error'>{state.password.error}</span>

        <button
          className={`login__submit ${disable && 'login__submit_disabled'}`}
          type='submit'
          disabled={disable}>Войти</button>
      </form>

      <div className='login__register'>
        <p className='login__register-text'>Ещё не зарегистрированы?&nbsp;</p>
        <Link to='/signup' className='login__register-link'>Регистрация</Link>
      </div>
    </section>
  )
}

export default Login;