import React from 'react'
import '../styles/navbar.scss'
import { Link } from 'react-scroll'

export default function Navbar() {
  return <div>
    <header className='navbarJR scrolled'>
      <nav className="navigationJR">
        <div className='whiteText navigationItemJR'>
          <Link activeClass='active' to='home' spy={true} smooth={true}>Home</Link>
        </div>
        <div className='whiteText navigationItemJR'>
          <Link activeClass='active' to='about' spy={true} smooth={true}>About</Link>
        </div>
        <div className='whiteText navigationItemJR'>
          <Link activeClass='active' to='skills' spy={true} smooth={true} offset={-300}>Skills</Link>
        </div>
        <div className='whiteText navigationItemJR'>
          <Link activeClass='active' to='work' spy={true} smooth={true} offset={-300}>Work</Link>
        </div>
        <div className='whiteText navigationItemJR'>
          <Link activeClass='active' to='contact' spy={true} smooth={true} offset={-300}>Contact</Link>
        </div>
      </nav>
    </header>
  </div>
}