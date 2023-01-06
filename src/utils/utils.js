const imageUrl = 'https://api.nomoreparties.co/';

export default function filterShortMovies(movies) {
  return movies.filter((movie) => movie.duration <= 40);
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

 export {
  imageUrl,
  transformDuration
};