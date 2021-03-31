import React from 'react'
import '../styles/navbar.scss'

export default function Navbar() {
  return <div>
    <header className='navbar scrolled'>
      <nav className="navigation">
        <div className='whiteText navigationItem'>Home</div>
        <div className='whiteText navigationItem'>About</div>
        <div className='whiteText navigationItem'>Work</div>
        <div className='whiteText navigationItem'>Contact</div>
      </nav>

    </header>
  </div>
}