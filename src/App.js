import React from 'react'
import { Ocean } from './components/Ocean'
import Tree from './components/Tree'
import Navbar from './components/Navbar'
import Title from './components/Title'
import About from './components/About'
import Skills from './components/Skills'
import Home from './components/Home'
import Work from './components/Work'
import Contact from './components/Contact'
import 'bulma'

function App() {
  window.onresize = function() { window.location.reload(false); }

  return <div >
      <Home />
      <Tree />
      <Ocean />
      <Navbar />
      <Title />
      <About />
      <Skills />
      <Work />
      <Contact />
    </div>
}

export default App
