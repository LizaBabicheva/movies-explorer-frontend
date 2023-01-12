import { SHORT_MOVIE_DURATION_IN_MIN } from './constants';

const imageUrl = 'https://api.nomoreparties.co/';

export default function filterShortMovies(movies) {
  return movies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION_IN_MIN);
}

function transformDuration(duration) {
  const hours = Math.floor(duration / 60);
  const remainingMinutes = duration % 60;
  if (hours === 0) {
    return `${remainingMinutes}м`
  } else {
    return `${hours}ч ${remainingMinutes}м`
  }
}

const nameValidationSchema = {
  required: true,
  validators: [
    {
      validate: (input) => {
        return input.length > 1 && input.length <= 30
      },
      error: 'Поле должно содеражть от 2 до 30 символов'
    },
    {
      validate: (input) => {
        return /^[a-zA-Zа-яА-Я\- ]+$/.test(input);
      },
      error: 'Поле может содержать только латиницу, кириллицу, пробел или дефис',
    }
  ]
};

const emailValidationSchema = {
  required: true,
  validators: [
    {
      validate: (input) => {
        return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(input);
      },
      error: 'Поле должно соответствовать шаблону электронной почты',
    }
  ]
};

const passwordValidationSchema = {
  required: true,
  validators: [
    {
      validate: (input) => {
        return /^[^\sА-Яа-я]+$/.test(input);
      },
      error: 'Пароль может содержать только символы, цифры и латинские буквы',
    }
  ]
};

function filterMovies(movies, searchQuery) {
  debugger;
  return movies.filter(movie => movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()));
}

export {
  imageUrl,
  transformDuration,
  nameValidationSchema,
  emailValidationSchema,
  passwordValidationSchema,
  filterMovies
};