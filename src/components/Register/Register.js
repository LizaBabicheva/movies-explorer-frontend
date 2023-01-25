import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';
import useForm from '../../hooks/useForm';
import { emailValidationSchema, nameValidationSchema, passwordValidationSchema } from '../../utils/utils';

function Register({ onSignup }) {

  const stateSchema = {
    name: { value: '', error: '' },
    email: { value: '', error: '' },
    password: { value: '', error: '' },
  };

  const validationStateSchema = {
    name: nameValidationSchema,
    email: emailValidationSchema,
    password: passwordValidationSchema
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
          disabled={disable}>
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