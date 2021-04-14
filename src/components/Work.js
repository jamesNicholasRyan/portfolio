import React from 'react'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import horizontalCss from 'react-animated-slider/build/horizontal.css';
import "../styles/slider-animations.css"

export default function Work() {
  const slides = [
    { title: 'Battleships', 
      description: 'Battleships was a solo project, where we were tasked with creating a grid based game using JavaScript, HTML and CSS. I enjoyed this project thoroughly and it allowed me to develop my vanilla JavaScript skills. I enjoyed working on my own - planning my time efficiently and designing a fun game. In my own time I decided to add music of my own to fully realise the project’s theme.',
      tech: 'JavaScript, HTML5, CSS',
      image: 'https://i.imgur.com/vBdVeVY.png',
      siteLink: 'https://jamesnicholasryan.github.io/Battleships/',
      readme: 'https://github.com/jamesNicholasRyan/Battleships'
    },
    { title: 'Baggle', 
      description: 'This was my last project during the bootcamp course. It was an opportunity to apply my new skills in SQL databases and a Python/Flask back-end. My team and I decided to create a cashless, bartering e-commerce website. We felt that the system of swapping items was an interesting concept to tackle in an SQL architecture. I focused my time on creating the relationships between the different backend models. I utilised the self referencial capabilities of an SQL server, which allowed us to offer items for other items, and for different users to follow each other.',
      tech: 'React, Node, Python, Flask, SQL, PostgreSQL,  Marshmallow, JavaScript, HTML5, CSS',
      image: 'https://i.imgur.com/wCCKshk.png',
      siteLink: 'https://baggles.herokuapp.com',
      readme: 'https://bit.ly/bagglesReadMe'
    },
    { title: 'F1 Circuit Mapper', 
      description: 'This was a two day pair project, where we were tasked with picking an existing API and implementing it into our own website. My partner and I decided to go with an F1 motorsports API, as we felt the data provided had lots of potential for great visuals. We utilised the capabilities of a REST API (GET, PUT, POST, DELETE) to create a fully functioning website that visually displayed all historical F1 Grand Prixs and their circuits. The most challenging part of the project was implementing the MapGL component, which displayed all of the circuits. Once we had tackled that, the project was a very enjoyable experience.',
      tech: 'React, Node, REST APIs, JavaScript, HTML5, CSS',
      image: 'https://i.imgur.com/C6itr2m.png',
      siteLink: 'https://bit.ly/jnryanf1',
      readme: 'https://bit.ly/F1ReadMe'
    },
    { title: 'Park Pong', 
      description: 'This was a collaborative project, completed in a group of four. We applied our knowledge of MongoDB & Express to create a full stack website. It was also the first opportunity to work in a large group, utilising the benefits of Git-Hub and version control. We worked well as a team, dividing the workload between us in a way that would be efficient for our time and allow us to gain the most experience. I focused on the user elements of the site, creating the user model and controllers, whilst utilising the React to display the profiles and user search. ',
      tech: 'React, Node, MongoDB, Mongoose, Express, MapBoxGL, JavaScript, HTML5, CSS',
      image: 'https://i.imgur.com/paziQSY.png',
      siteLink: 'https://park-table-tennis.herokuapp.com',
      readme: 'https://bit.ly/pongParkReadMe'
    },
  ]

  let skillsHeight = 0
  function calculateSize() {
    const { innerHeight: height } = window
    skillsHeight = String(height + 1900)
  }
  calculateSize()

  return <div 
      id='Work'
      className='sliderContainer'
      style={{
        color: 'white',
        position: 'absolute', 
        top: `${skillsHeight}px`,
      }}
    > 
      <div className='workTitle'>My Work</div>
      <Slider className='slider'>
        {slides.map((slide, index) => {
          return <div key={index} className='slide slider-content columns is-centered'>
            <div className='column is-one-half slideSectionLeft'>
                <h2 className='title is-1 projTitle has-text-left is-size-3-touch center'>{slide.title}</h2>
                <div className='readmeLink block is-size-5 has-text-weight-bold is-size-7-touch'>Tech used: {slide.tech}</div>
                <div className='projectImage imageJR'>
                  <img className='imageJR' src={slide.image} alt={slide.image}></img>
                </div>
            </div>

            <div className='column slideSectionRight'>
              <div className='whiteText block is-size-4 is-size-7-touch'>{slide.description}</div>
              <a className='readmeLink block is-size-5 is-size-7-touch' href={slide.readme} target="_blank" rel="noreferrer">Link to readme</a>
              <a className='readmeLink block is-size-5 is-size-7-touch' href={slide.siteLink} target="_blank" rel="noreferrer">Link to site</a>
            </div>
          </div>})}
      </Slider>
    </div>
}
