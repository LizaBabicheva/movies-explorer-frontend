import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';

function Register() {
  return (
    <section className='register'>
      <Link className='header__logo header__menu-link' to='/'><img src={logo} alt='Лого'></img></Link>
      <h2 className='register__title'>Добро пожаловать!</h2>

      <form className='register__form'>
        <label
          className='register__label'
          htmlFor='name'>Имя</label>
        <input
          className='register__input'
          type='text'
          minLength='2'
          maxLength='30'
          required
          id='name'
          name='name'>
        </input>
        <span className='register__error'></span>

        <label
          className='register__label'
          htmlFor='email'>E-mail</label>
        <input
          className='register__input'
          type='email'
          required
          id='email'
          name='email'>
        </input>
        <span className='register__error'></span>

        <label
          className='register__label'
          htmlFor='password'>Пароль</label>
        <input
          className='register__input register__input_type_error'
          type='password'
          required
          id='password'
          name='password'>
        </input>
        <span className='register__error'>Что-то пошло не так...</span>

        <button
          className='register__submit'
          type='submit'>
          Зарегистрироваться
        </button>
      </form>

      <div className='register__login'>
        <p className='register__login-text'>Уже зарегистрированы?&nbsp;</p>
        <Link to='/signin' className='register__login-link'>Войти</Link>
      </div>
    </section>
  )
}

export default Register;