import React from 'react'
import { Ocean } from './components/Ocean'
import Tree from './components/Tree'
import Navbar from './components/Navbar'
import Title from './components/Title'
import About from './components/About'
import Skills from './components/Skills'
import './styles/App.css'

function App() {

  return <div className="App">
      <Tree />
      <Ocean />
      <Navbar />
      <Title />
      <About />
      <div style={ { position: 'absolute', top: '207%' } }>
      <Skills />
      </div>
      <div>Projects</div>
      <div class='container'>Hello my name is james
        <div class='box'>Example text here...</div>
        <div class='box'>Example text here...</div>
        <div class='box'>Example text here...</div>
        <div class='box'>Example text here...</div>
      </div>
      <div class='box'>FOOTER</div>
    </div>
}

export default App
