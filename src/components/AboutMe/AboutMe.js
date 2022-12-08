import './AboutMe.css';
// ЗАМЕНИТЬ ССЫЛКИ

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className='main__section-title'>Студент</h2>

      <div className='about-me__profile'>
        <h3 className='about-me__name'>Елизавета</h3>
        <p className='about-me__occupation'>Фронтенд-разработчик, 31 год</p>
        <p className='about-me__info'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        <a className='about-me__link'
          href='https://github.com/LizaBabicheva'>Github</a>
        <img className='about-me__photo' alt='Фотография'></img>
      </div>

      <div className='about-me__portfolio'>
        <h4 className='about-me__portfolio-title'>Портфолио</h4>
        <ul className='about-me__portfolio-links'>
          <li className='about-me__list-item'>
            <a className='about-me__portfolio-link'
              href='https://github.com/LizaBabicheva'>Статичный сайт
              <span className='about-me__span'>&#8599;</span>
            </a>
          </li>
          <li className='about-me__list-item'>
            <a className='about-me__portfolio-link'
              href='https://github.com/LizaBabicheva'>Адаптивный сайт
              <span className='about-me__span'>&#8599;</span>
            </a>
          </li>
          <li className='about-me__list-item'>
            <a className='about-me__portfolio-link'
              href='https://github.com/LizaBabicheva'>Одностраничное приложение
              <span className='about-me__span'>&#8599;</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default AboutMe;