// import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.svg';

function Login() {
  return (
    <section className='login'>
      <Link className='login__logo' to='/'><img src={logo} alt='Лого'></img></Link>
      <h2 className='login__title'>Рады видеть!</h2>

      <form className='login__form'>
        <label
          className='login__label'
          for='email'>E-mail</label>
        <input 
          className='login__input'
          type="email"
          id='email'
          name='email'>
        </input>
        <span className='login__error'>Ошибочка вышла</span>

        <label
          className='login__label'
          for='password'>Пароль</label>
        <input
          className='login__input'
          type='password'
          id='password'
          name='password'>
        </input>
        <span className='login__error'></span>
       
        <button className='login__submit'>Войти</button>
        </form>

        <div className='login__register'>
          <p className='login__register-text'>Ещё не зарегистрированы?&nbsp;</p>
          <Link to='/signup' className='login__register-link'>Регистрация</Link>
        </div>
    </section>
  )
}

export default Login;