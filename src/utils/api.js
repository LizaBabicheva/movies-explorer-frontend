class Api {

  getInitialMovies() {
    return new Promise((resolve, reject) => resolve([
      {
        _id: '1',
        title: '33 слова о дизайне',
        image: '../../images/pic_1.jpg',
        duration: '1ч 47м',
        saved: true
      },
      {
        _id: '2',
        title: 'Киноальманах «100 лет дизайна»',
        image: '../../images/pic_2.jpg',
        duration: '1ч 3м',
        saved: true
      },
      {
        _id: '3',
        title: 'В погоне за Бенкси',
        image: '../../images/pic_3.jpg',
        duration: '1ч 42м',
        saved: true
      },
      {
        _id: '4',
        title: 'Баския: Взрыв реальности',
        image: '../../images/pic_4.jpg',
        duration: '1ч 21м'
      },
      {
        _id: '5',
        title: 'Бег это свобода',
        image: '../../images/pic_5.jpg',
        duration: '1ч 44м'
      },
      {
        _id: '6',
        title: 'Книготорговцы',
        image: '../../images/pic_6.jpg',
        duration: '1ч 37м'
      },
      {
        _id: '7',
        title: 'Когда я думаю о Германии ночью',
        image: '../../images/pic_7.jpg',
        duration: '1ч 56м'
      },
      {
        _id: '8',
        title: 'Gimme Danger: История Игги и The Stooge...',
        image: '../../images/pic_8.jpg',
        duration: '1ч 59м'
      },
      {
        _id: '9',
        title: 'Дженис: Маленькая девочка грустит',
        image: '../../images/pic_9.jpg',
        duration: '1ч 42м'
      },
      {
        _id: '10',
        title: 'Соберись перед прыжком',
        image: '../../images/pic_10.jpg',
        duration: '1ч 10м'
      },
      {
        _id: '11',
        title: 'Пи Джей Харви: A dog called money',
        image: '../../images/pic_11.jpg',
        duration: '1ч 4м'
      },
      {
        _id: '12',
        title: 'По волнам: Искусство звука в кино',
        image: '../../images/pic_12.jpg',
        duration: '1ч 7м'
      }
    ]));
  }
}

export default Api;