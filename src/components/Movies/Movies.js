import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';

import aboutDesign from '../../images/pic_1.jpg';
import hundredYears from '../../images/pic_2.jpg';
import benksy from '../../images/pic_3.jpg';
import basquiat from '../../images/pic_4.jpg';
import running from '../../images/pic_5.jpg';
import bookSellers from '../../images/pic_6.jpg';
import aboutGermany from '../../images/pic_7.jpg';
import gimmeDanger from '../../images/pic_8.jpg';
import smallGirl from '../../images/pic_9.jpg';
import beforeJump from '../../images/pic_10.jpg';
import pjHarvey from '../../images/pic_11.jpg';
import soundArt from '../../images/pic_12.jpg';

function Movies() {
  return (
    <section className="movies">
      <SearchForm />

      <ul className='movies-list'>

        <MoviesCard
          title='33 слова о дизайне'
          image={aboutDesign}
          duration='1ч 47м' />
        <MoviesCard
          title='Киноальманах «100 лет дизайна»'
          image={hundredYears}
          duration='1ч 3м' />
        <MoviesCard
          title='В погоне за Бенкси'
          image={benksy}
          duration='1ч 42м' />
        <MoviesCard
          title='Баския: Взрыв реальности'
          image={basquiat}
          duration='1ч 21м' />
        <MoviesCard
          title='Бег это свобода'
          image={running}
          duration='1ч 44м' />
        <MoviesCard
          title='Книготорговцы'
          image={bookSellers}
          duration='1ч 37м' />
        <MoviesCard
          title='Когда я думаю о Германии ночью'
          image={aboutGermany}
          duration='1ч 56м' />
        <MoviesCard
          title='Gimme Danger: История Игги и The Stooge...'
          image={gimmeDanger}
          duration='1ч 59м' />
        <MoviesCard
          title='Дженис: Маленькая девочка грустит'
          image={smallGirl}
          duration='1ч 42м' />
        <MoviesCard
          title='Соберись перед прыжком'
          image={beforeJump}
          duration='1ч 10м' />
        <MoviesCard
          title='Пи Джей Харви: A dog called money'
          image={pjHarvey}
          duration='1ч 4м' />
        <MoviesCard
          title='По волнам: Искусство звука в кино'
          image={soundArt}
          duration='1ч 7м' />

      </ul>
      <button className='movies__more-button' type='button' aria-label='Загрузить еще'>Ещё</button>
    </section>
  )
}

export default Movies;