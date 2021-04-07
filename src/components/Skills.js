import React from 'react'
import Babel from '../images/Babel.png'
import CSS3 from '../images/CSS3.png'
import Flask from '../images/Flask.png'
import Git from '../images/Git.png'
import GitHub from '../images/GitHub.png'
import HTML5 from '../images/HTML5.png'
import JavaScript from '../images/JavaScript.png'
import MongoDB from '../images/MongoDB.png'
import Nodejs from '../images/Nodejs.png'
import npm from '../images/npm.png'
import p5js from '../images/p5js.png'
import PostgreSQL from '../images/PostgreSQL.png'
import Python from '../images/Python.png'
import Reactjs from '../images/Reactjs.png'
import Webpack from '../images/Webpack.png'

export default function Sklls() {
  const iconArray = [Babel, CSS3, Flask, Git, GitHub, HTML5, JavaScript, MongoDB, Nodejs, npm, p5js, PostgreSQL, Python, Reactjs, Webpack]
  const iconString = ['Babel', 'CSS3', 'Flask', 'Git', 'GitHub', 'HTML5', 'JavaScript', 'MongoDB', 'Node.js', 'npm', 'p5.js', 'PostgreSQL', 'Python', 'React.js', 'Webpack']
  
  let skillsHeight = 0
  function calculateSize() {
    const { innerHeight: height } = window
    skillsHeight = String(height + 1980)
  }
  calculateSize()

  return <div 
        id='Skills'
        style={{
          position: 'absolute', 
          top: `${skillsHeight}px`,
        }}
        >
      <div className='skillsTitle'>My Skills</div>
      <div
        className='skillsContainer' 
        // style={{
        //   position: 'absolute', 
        //   top: `${skillsHeight}px`,
        // }}
      >
      {iconArray.map((icon, index) => {
        return <div key={index}>
          <div className='iconContainer'>
            <img src={icon} alt={icon} className='skillIcon iconHover'></img>
            <p style={ { position: 'absolute' } } className='iconString text-30'>{iconString[index]}</p>
          </div>
        </div>
      })}
    </div>
  </div>
}