const SHORT_MOVIE_DURATION_IN_MIN = 40;

const DESKTOP_INITIAL_CARDS_NUMBER = 12;
const TABLET_INITIAL_CARDS_NUMBER = 8;
const MOBILE_INITIAL_CARDS_NUMBER = 5;

const MOBILE_WINDOW_SIZE = 480;
const TABLET_WINDOW_SIZE = 768;

const DESKTOP_LOAD_MORE_CARDS = 3;
const TABLET_LOAD_MORE_CARDS = 2;
const MOBILE_LOAD_MORE_CARDS = 2;

const CONFLICT_ERROR_MESSAGE = 'Пользователь с таким email уже существует';
const BAD_REQUEST_ERROR_MESSAGE = 'Проверьте корректность введенных данных';
const INTERNAL_SERVER_ERROR_MESSAGE = 'Что-то пошло не так, попробуйте еще раз';
const WRONG_AUTH_DATA_ERROR_MESSAGE = 'Вы ввели неправильный email или пароль';

const SUCCESS_REGISTER_MESSAGE = 'Вы успешно зарегистрировались';
const SUCCESS_DATA_CHANGE_MESSAGE = 'Вы успешно изменили данные';

const NOT_FOUND_MESSAGE = 'Ничего не найдено';
const SERVER_ERROR_MESSAGE = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'

export {
  SHORT_MOVIE_DURATION_IN_MIN,
  DESKTOP_INITIAL_CARDS_NUMBER,
  TABLET_INITIAL_CARDS_NUMBER,
  MOBILE_INITIAL_CARDS_NUMBER,
  MOBILE_WINDOW_SIZE,
  TABLET_WINDOW_SIZE,
  DESKTOP_LOAD_MORE_CARDS,
  TABLET_LOAD_MORE_CARDS,
  MOBILE_LOAD_MORE_CARDS,
  CONFLICT_ERROR_MESSAGE,
  BAD_REQUEST_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  WRONG_AUTH_DATA_ERROR_MESSAGE,
  SUCCESS_REGISTER_MESSAGE,
  SUCCESS_DATA_CHANGE_MESSAGE,
  NOT_FOUND_MESSAGE,
  SERVER_ERROR_MESSAGE
}