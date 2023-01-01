import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__info'>
        <p className='footer__copyright footer__text'>&copy; {new Date().getFullYear()}</p>
        <ul className='footer__links'>
          <li>
            <a className='footer__link footer__text'
              href='https://practicum.yandex.ru/'
              target='_blank'
              rel='noreferrer'>Яндекс.Практикум</a>
          </li>
          <li>
            <a className='footer__link footer__text'
              href='https://github.com/'
              target='_blank'
              rel='noreferrer'>Github</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;