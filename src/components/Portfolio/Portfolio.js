import './Portfolio.css';

function Portfolio() {
  return (
    <div className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__links'>
        <li className='portfolio__list-item'>
          <a className='portfolio__link'
            href='https://lizababicheva.github.io/how-to-learn/index.html'
            target='_blank'
            rel='noreferrer'>Статичный сайт
            <span className='portfolio__link-span'>&#8599;</span>
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a className='portfolio__link'
            href='https://lizababicheva.github.io/russian-travel/index.html'
            target='_blank'
            rel='noreferrer'>Адаптивный сайт
            <span className='portfolio__link-span'>&#8599;</span>
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a className='portfolio__link'
            href='https://mesto.lizababicheva.nomoredomains.icu/'
            target='_blank'
            rel='noreferrer'>Одностраничное приложение
            <span className='portfolio__link-span'>&#8599;</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Portfolio;