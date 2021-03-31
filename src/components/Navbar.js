import React from 'react'
import '../styles/navbar.scss'
import { Link } from 'react-scroll'

export default function Navbar() {
  return <div>
    <header className='navbar scrolled'>
      <nav className="navigation">
        <div className='whiteText navigationItem'>
          <Link activeClass='active' to='home' spy={true} smooth={true}>Home</Link>
        </div>
        <div className='whiteText navigationItem'>
          <Link activeClass='active' to='about' spy={true} smooth={true}>About</Link>
        </div>
        <div className='whiteText navigationItem'>
          <Link activeClass='active' to='skills' spy={true} smooth={true} offset={-300}>Skills</Link>
        </div>
        <div className='whiteText navigationItem'>Work</div>
        <div className='whiteText navigationItem'>Contact</div>
      </nav>
    </header>
  </div>
}