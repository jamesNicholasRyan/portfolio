import React, { useState } from 'react'
import '../styles/navbar.scss'
import { Link } from 'react-scroll'

export default function Navbar() {
  const [clicked, toggleClick] = useState('')

  const itemsObject = {'Home': 0, 'About': 0, 'Skills': -300, 'Work': -300, 'Contact': -300}

  function toggleClicked(event) {
    const itemName = event.target.innerHTML
    toggleClick(itemName)
  }

  return <div>
    <header className='navbarJR scrolled'>
      <div className="navigationJR">
        {Object.keys(itemsObject).map((key, index) => {
          return  <div id={index} className='navigationItemJR'>
              <Link 
                id='link' 
                className={`${clicked === key ? 'clicked' : ''}`}
                activeClass='active' 
                to={key} 
                spy={true} 
                smooth={true}
                offset={itemsObject[key]}
                onClick={(event) => toggleClicked(event)}
                >{key}
              </Link>
            </div>
          }
        )}
      </div>
    </header>
  </div>
}