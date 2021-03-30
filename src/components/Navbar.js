import React from 'react'
import '../styles/navbar.scss'

export default function Navbar() {
  return <div>
    <header className='navbar scrolled'>

      <div className="logo">
        <div className='whiteText'>NAVBAR HERE...</div>
      </div>
      <nav className="navigation">
        <div className='whiteText'>ABOUT</div>
        <div className='whiteText'>PROJECTS</div>
        <div className='whiteText'>CONTACT</div>
      </nav>

    </header>
  </div>
}