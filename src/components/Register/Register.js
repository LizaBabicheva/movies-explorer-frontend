// import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';

function Register() {
  return (
    <section className='register'>
      <Link className='register__logo' to='/'><img src={logo} alt='Лого'></img></Link>
      <h2 className='register__title'>Добро пожаловать!</h2>

      <form className='register__form'>
      <label
          className='register__label'
          for='name'>Имя</label>
        <input 
          className='register__input'
          type="text"
          id='name'
          name='name'>
        </input>
        <span className='register__error'></span>

        <label
          className='register__label'
          for='email'>E-mail</label>
        <input 
          className='register__input'
          type="email"
          id='email'
          name='email'>
        </input>
        <span className='register__error'></span>

        <label
          className='register__label'
          for='password'>Пароль</label>
        <input
          className='register__input'
          type='password'
          id='password'
          name='password'>
        </input>
        <span className='register__error'>Что-то пошло не так...</span>
       
        <button className='register__submit'>Войти</button>
        </form>

        <div className='register__login'>
          <p className='register__login-text'>Ещё не зарегистрированы?&nbsp;</p>
          <Link to='/signin' className='register__login-link'>Регистрация</Link>
        </div>
    </section>
  )
}

export default Register;