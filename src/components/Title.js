import React from 'react'
import '../styles/index.css';

export default function Title() {
  const quote = `I am a software developer with previous\nexperience in the music and audio industries`

  return <div id='home' className='titleSection'>
    <div className='titleContainer'>
      <div className='title'>JAMES RYAN</div>
      <p className='subTitle'>Software Developer</p>
      <p className='quote'>{quote}</p>
    </div>
  </div>
}