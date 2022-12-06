import './AboutMe.css';
import linkIcon from '../../images/link-icon.svg';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className='main__section-title'>Студент</h2>
      
      <div className='about-me__profile'>
        <h3 className='about-me__name'>Елизавета</h3>
        <p className='about-me__occupation'>Фронтенд-разработчик, 31 год</p>
        <p className='about-me__info'>"Я родился в Москве в 70-м на краю города..."</p>
        <a className='about-me__link'>Github</a>
        <img className='about-me__photo' alt='Фотография'></img>
      </div>

      <div className='about-me__portfolio'>
        <h4 className='about-me__portfolio-title'>Портфолио</h4>
        <ul className='about-me__portfolio-links'>
          <li>
            <a className='about-me__portfolio-link'>Статичный сайт
              <img className='about-me__link-icon' src={linkIcon} alt='Перейти на сайт'></img>
            </a>
          </li>
          <li className='about-me__portfolio-link'>
            <a className='about-me__portfolio-link'>Адаптивный сайт
              <img className='about-me__link-icon' src={linkIcon} alt='Перейти на сайт'></img>
            </a>
          </li>
          <li className='about-me__portfolio-link'>
            <a className='about-me__portfolio-link'>Одностраничное приложение
              <img className='about-me__link-icon' src={linkIcon} alt='Перейти на сайт'></img>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default AboutMe;