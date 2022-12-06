import './Techs.css';

function Techs() {
  return (
    <section className="techs">
      <h2 className='main__section-title'>Технологии</h2>
      <div className='techs__about'>
        <h3 className='techs__title'>7 технологий</h3>
        <p className='project-info__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className='techs__links'>
          <li className='techs__link'>
            <a>HTML</a>
          </li>
          <li className='techs__link'>
            <a>CSS</a>
          </li>
          <li className='techs__link'>
            <a>JS</a>
          </li>
          <li className='techs__link'>
            <a>React</a>
          </li>
          <li className='techs__link'>
            <a>Git</a>
          </li>
          <li className='techs__link'>
            <a>Express.js</a>
          </li>
          <li className='techs__link'>
            <a>mongoDB</a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Techs;