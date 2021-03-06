import React from 'react'
import '../styles/index.css';

export default function Title() {
  const quote = `I'm a software developer with previous\nexperience in the music and audio industries`

  return <div id='Home' className='titleSection'>
    <div className='titleContainer'>
      <div className='titleJR'>JAMES RYAN</div>
      <p className='subTitle titleSubTitle'>Software Developer</p>
      <p className='quote'>{quote}</p>
    </div>
  </div>
}