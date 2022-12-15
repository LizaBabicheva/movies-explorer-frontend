import Portfolio from '../Portfolio/Portfolio';
import './AboutMe.css';
import photo from '../../images/about-me-photo.jpeg';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className='main__section-title'>Студент</h2>
      <div className='about-me__profile'>
        <h3 className='about-me__name'>Виталий</h3>
        <p className='about-me__occupation'>Фронтенд-разработчик, 31 год</p>
        <p className='about-me__info'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        <a className='about-me__link'
          href='https://github.com/LizaBabicheva'
          target='_blank'
          rel='noreferrer'>Github</a>
        <img className='about-me__photo' alt='Фотография из резюме' src={photo}></img>
      </div>

      <Portfolio />

    </section>
  )
}

export default AboutMe;