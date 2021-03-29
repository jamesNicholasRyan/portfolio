import React from 'react'
import { Ocean } from './components/Ocean'
import Tree from './components/Tree'
import './App.css'

function App() {

  return <div className="App">
      <div>NAVBAR</div>
      <div>
      <Tree />
      <Ocean />
        <div>About</div>
      </div>

      <div>
        <div>Projects</div>
        <div class='container'>Hello my name is james
          <div class='box'>Example text here...</div>
          <div class='box'>Example text here...</div>
          <div class='box'>Example text here...</div>
          <div class='box'>Example text here...</div>
        </div>
      </div>
      <div class='box'>FOOTER</div>
    </div>
}

export default App
