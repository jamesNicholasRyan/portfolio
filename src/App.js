import React from 'react'
import { Ocean } from './components/Ocean'
import Tree from './components/Tree'
import Navbar from './components/Navbar'
import Title from './components/Title'
import About from './components/About'
import Skills from './components/Skills'
import Home from './components/Home'
import './styles/App.css'

function App() {
  window.onresize = function() { window.location.reload(false); }

  return <div className="App">
      <Home />
      <Tree />
      <Ocean />
      <Navbar />
      <Title />
      <About />
      <Skills />
      <div>Projects</div>
      <div className='container'>Hello my name is james
        <div className='box'>Example text here...</div>
        <div className='box'>Example text here...</div>
        <div className='box'>Example text here...</div>
        <div className='box'>Example text here...</div>
      </div>
      <div className='box'>FOOTER</div>
    </div>
}

export default App
