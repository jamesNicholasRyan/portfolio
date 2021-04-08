import React from 'react'
import '../styles/index.css';

export default function About() {
  let aboutHeight = 0
  function calculateSize() {
    const { innerHeight: height } = window
    aboutHeight = String((height + 2000)*0.6)
  }
  calculateSize()

  return <div 
    id='About' 
    className='section aboutSection columns is-centered'
    style={{
      position: 'absolute', 
      top: `${aboutHeight}px`,
    }}
    >
    <div className='columns column is-centered is-three-quarters'>
      <div className='profileImage column is-one-third bottom'>
        <img src='https://media-exp1.licdn.com/dms/image/C4D03AQEhHTR0GDO0aQ/profile-displayphoto-shrink_800_800/0/1555516099921?e=1622678400&v=beta&t=q5f2tzzs9-oHZzUOuSv3r46XhbAgp1E_4jZ--oHb76s'></img>
      </div>
      <div className='text-20 darkText column has-text-left has-text-weight-semibold bottom'>
        I am a software developer with previous experience in the music and audio industries. My interest in coding began after self-teaching in Processing, a creative Java port. I grew inspired by the ability to be innovative and fun with programming and I have since been on a journey to create new and exciting things with the skills I have learnt. Whilst concatenating my expertise in previous roles, I am looking to work as a software developer in a fast paced, creative environment, where people share ideas and I can learn from others.
      </div>
    </div>
  </div>
}
