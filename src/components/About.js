import React from 'react'
import '../styles/index.css';

export default function About() {
  let aboutHeight = 0
  function calculateSize() {
    const { innerWidth: width } = window
    const { innerHeight: height } = window
    if (width > 760) {
      aboutHeight = String((height + 800)*0.6)
    } else {
      aboutHeight = String((height + 400)*0.6)
    }
  }
  calculateSize()

  return <div 
    id='About' 
    className='section'
    style={{
      position: 'absolute', 
      top: `${aboutHeight}px`,
    }}
    >
    <div className='section'>
      <div className='columns is-centered is-multiline is-half-mobile'>
        <div className='columns column is-centered is-four-fifths'>
          <div className='column bottom'>
            <img height="100%" src='https://media-exp1.licdn.com/dms/image/C4D03AQEhHTR0GDO0aQ/profile-displayphoto-shrink_800_800/0/1555516099921?e=1622678400&v=beta&t=q5f2tzzs9-oHZzUOuSv3r46XhbAgp1E_4jZ--oHb76s'></img>
          </div>
          <div className='column is-half-tablet is-two-thirds-desktop item'>
            <div className='darkText block is-size-4-desktop is-size-6-tablet has-text-left has-text-weight-semibold bottom'>
              Hi there, welcome to my portfolio!
            </div>
            <div className='darkText block is-size-4-desktop is-size-6-tablet has-text-left has-text-weight-semibold'>
              I am a software developer with previous experience in the music and audio industries. My interest in coding began after self-teaching in Processing, a creative Java port. I grew inspired by the ability to be innovative and fun with programming and I have since been on a journey to create new and exciting things with the skills I have learnt. Whilst concatenating my expertise in previous roles, I am looking to work as a software developer in a fast paced, creative environment, where people share ideas and I can learn from others.
            </div>
          </div>
        </div>
        <div className='columns column is-centered is-four-fifths'>
          <div className='column is-half'>
            <div className='darkText block is-size-4-desktop is-size-6-tablet has-text-left has-text-weight-semibold bottom'>
              In my spare time I enjoy making music, whether I'm singing in a choir or playing around with some midi instruments in Pro Tools. I also enjoy music from around the world, I haved played gamelan with the Gamelan Southbank Players in the past.
            </div>
            <div className='darkText block is-size-4-desktop is-size-6-tablet has-text-left has-text-weight-semibold bottom'>
              I've mentioned I like music a lot already, so here is a little piece I wrote uploaded to YouTube. 
            </div>
          </div>
          <div className='column'>
            <iframe className='is-fullwidth' width="100%" height="100%" src="https://www.youtube.com/embed/L7sCWjctnLc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
}
