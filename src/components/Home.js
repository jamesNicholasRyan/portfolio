import React from 'react'
import p5 from 'p5'
import inconsolata from '../fonts/Inconsolata-Regular.ttf'
import { forceLineOne, forceLineTwo, forceLineThree, moveLineOne, moveLineTwo, moveLineThree, moveLineFour, arrayLineOne, arrayLineTwo, arrayLineThree, arrayLineFour } from './letterData' 

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  Home = (p) => {
    var canvas
    // const characterWidth = 40
    // const characterHeight = 50
    const characterWidth = p.windowWidth*0.016
    const characterHeight = characterWidth + (characterWidth/4)

    const forceText = [forceLineOne, forceLineTwo, forceLineThree]
    const moveText = [moveLineOne, moveLineTwo, moveLineThree, moveLineFour]
    const arrayText = [arrayLineOne, arrayLineTwo, arrayLineThree, arrayLineFour]

    const letters = []
    let consolas =''

    p.preload = () => {
      consolas = p.loadFont(inconsolata)
    }
    
    p.setup = () => {
      p.pixelDensity(1)
      console.log('setup!')
      canvas = p.createCanvas(p.windowWidth, p.windowHeight)
      canvas.position(0, 0)
      canvas.style('z-index', '-1')

      setupBackgroundCode(forceText, p.windowWidth * 0.6, p.windowHeight*0.18)
      setupBackgroundCode(moveText, p.windowWidth * 0.6, p.windowHeight*0.37)
      setupBackgroundCode(arrayText, p.windowWidth * 0.6, p.windowHeight*0.58)

    }

    p.draw = () => {
      p.background(0, 15, 30)

      letters.forEach((character) => {
        character.display()
        character.move()
        character.drag()
        character.avoid()
        character.flock()
      })

    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
      p.setup()
    }

    function setupBackgroundCode(block, X, Y) {
      let counter2 = 0
      block.forEach((line) => {
        let counter = 0
        line.forEach((word) => {
          Object.keys(word).forEach((key) => {
            for (let i = 0; i < key.length; i++) {
              const newCharacter = new Letter(X + counter, Y+counter2, key[i], word[key], characterWidth, characterHeight)
              letters.push(newCharacter)
              counter = counter + characterWidth*0.5
            }
          })
        })
        counter2 = counter2 + characterHeight
      })
    }

    class Letter {
      constructor(X, Y, letter, color, charaterWidth, characterHeight) {
        this.location = p.createVector(X, Y)
        this.acceleration = p.createVector(0, 0)
        this.velocity = p.createVector(0, 0)
        this.letter = letter
        this.color = p.color(color[0], color[1], color[2])
        this.charaterWidth = charaterWidth
        this.characterHeight = characterHeight
      }

      display() {
        p.noStroke()
        p.fill(255, 0)
        p.rectMode(p.CENTER)
        p.rect(this.location.x, this.location.y, characterWidth, characterHeight)
        p.textFont(consolas)
        p.textSize(characterWidth)
        p.textAlign(p.CENTER, p.CENTER)
        this.color.setAlpha(200)
        p.fill(this.color)
        p.text(this.letter, this.location.x, this.location.y, characterWidth, characterHeight)
      }

      move() {
        this.velocity.add(this.acceleration)
        this.location.add(this.velocity)
        // this.acceleration.mult(0)
      }

      applyForce(force) {
        this.acceleration.add(force)
      }

      drag() {
        const dragCeof = 0.01
        const speed = this.velocity.mag()
        const dragMagnitude = dragCeof * speed * speed
        const drag = this.velocity.mult(-1)
        drag.normalize()
        drag.mult(dragMagnitude)
        this.applyForce(drag)
      }

      avoid() {
        const mouseVector = p.createVector(p.mouseX, p.mouseY)
        let perceptionRadius = 50
        let steering = p.createVector()
        const dist = p.dist(this.location.x, this.location.y, p.mouseX, p.mouseY)
        if (dist < perceptionRadius) {
          let diff = p5.Vector.sub(this.location, mouseVector)
          diff.div(dist)
          steering.add(diff)
          steering.setMag(0.05)
          steering.sub(this.velocity)
          steering.limit(10)
        }
        return steering
      }
      flock() {
        let avoid = this.avoid()
        this.acceleration.add(avoid)
      }
    }
  }

  componentDidMount() {
    this.myP5 = new p5(this.Home, this.myRef.current)
  }

  render() {
    return <div ref={this.myRef}>
    </div>
  }
}

export default Home