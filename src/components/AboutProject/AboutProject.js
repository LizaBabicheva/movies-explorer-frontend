import './AboutProject.css';

function AboutProject() {
  return (
    <section className='project-info'>
      <h2 className='main__section-title'>О проекте</h2>
      <ul className='project-info__cards'>
        <li className='project-info__card'>
          <h3 className='project-info__title'>Дипломный проект включал 5 этапов</h3>
          <p className='project-info__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className='project-info__card'>
          <h3 className='project-info__title'>На выполнение диплома ушло 5 недель</h3>
          <p className='project-info__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className='project-info__timeline'>
        <p className='project-info__timeline-first-part'>1 неделя</p>
        <p className='project-info__timeline-second-part'>4 недели</p>
        <p className='project-info__timeline-capture'>Back-end</p>
        <p className='project-info__timeline-capture'>Front-end</p>
      </div>
    </section>
  )
}

export default AboutProject;