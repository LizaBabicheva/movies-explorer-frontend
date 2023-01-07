class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json();
  }

  getUserInfo() {
    //
    // this._headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    //
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  updateUserInfo(data) {
        //
        // this._headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        //
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  getSavedMovies() {
        //
        // this._headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        //
    return fetch(this._baseUrl + '/movies', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  addNewMovie(data) {
        //
        // this._headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        //
    return fetch(this._baseUrl + '/movies', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        nameRU: data.nameRU,
        image: data.image,
        trailerLink: data.trailerLink,
        duration: data.duration,
        country: data.country,
        director: data.director,
        year: data.year,
        description: data.description,
        nameEN: data.nameEN,
        thumbnail: data.thumbnail,
        movieId: data.movieId,

      })
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

      // changeLikeApi(id, like) {
      //   return fetch(this._baseUrl + `/cards/${id}/likes`, {
      //     method: like ? 'PUT' : 'DELETE',
      //     credentials: 'include',
      //     headers: this._headers
      //   })
      //     .then((res) => {
      //       return this._getResponseData(res);
      //     })
      // }

  deleteMovieApi(id) {
        //
        // this._headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        //
    return fetch(this._baseUrl + `/movies/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }
}

const mainApi = new MainApi({
  // baseUrl: 'https://api.films.lizab.nomoredomains.club',
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;