import React from 'react'
import p5 from 'p5'
import inconsolata from '../fonts/Inconsolata-Regular.ttf'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  Home = (p) => {
    var canvas
    const characterWidth = 40
    const characterHeight = 50
    const yellowOne = p.color(255, 230, 109)
    const yellowTwo = p.color(255, 215, 24)
    const cyan = p.color(0, 232, 198)
    const hotPink = p.color(255, 0, 170)
    const grey = p.color(213, 206, 217)
    const pink = p.color(218, 112, 182)
    const backgroundLineOne = [ {'a': yellowOne}, {'p': yellowOne}, {'p': yellowOne}, {'l': yellowOne}, {'y': yellowOne}, {'F': yellowOne}, {'o': yellowOne}, {'r': yellowOne}, {'c': yellowOne}, {'e': yellowOne}, 
      {'(': yellowTwo}, 
      {'f': cyan}, {'o': cyan}, {'r': cyan}, {'c': cyan}, {'e': cyan},
      {')': yellowTwo},
      {' ': yellowOne}, {'{': yellowTwo}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne},     
    ]
    const backgroundLineTwo = [
      {' ': yellowOne}, {' ': yellowOne}, {'t': hotPink}, {'h': hotPink}, {'i': hotPink}, {'s': hotPink}, {'.': grey}, {'a': cyan}, {'c': cyan}, {'c': cyan}, {'e': cyan}, {'l': cyan}, {'e': cyan}, {'r': cyan}, {'a': cyan},
      {'t': cyan}, {'i': cyan}, {'o': cyan}, {'n': cyan}, {'.': grey}, {'a': yellowOne}, {'d': yellowOne}, {'d': yellowOne}, {'(': pink}, {'f': cyan}, {'o': cyan}, {'r': cyan}, {'c': cyan}, {'e': cyan}, {')': pink},
    ]
    const backgroundLineThree = [
      {'}': yellowTwo}
    ]
    const letters = []
    let consolas =''

    p.preload = () => {
      consolas = p.loadFont(inconsolata)
    }
    
    p.setup = () => {
      // consolas = p.loadFont(inconsolata)
      p.pixelDensity(1)
      console.log('setup!')
      canvas = p.createCanvas(p.windowWidth, p.windowHeight)
      canvas.position(0, 0)
      canvas.style('z-index', '-1')

      let counter = 0
      backgroundLineOne.forEach((character) => {
        Object.keys(character).map((key) => {
          const newCharacter = new Letter(p.windowWidth * 0.6 + counter, 300, key, character[key], characterWidth, characterHeight)
          letters.push(newCharacter)
        })
        counter = counter + characterWidth*0.6
      })
      counter = 0
      backgroundLineTwo.forEach((character) => {
        Object.keys(character).map((key) => {
          const newCharacter = new Letter(p.windowWidth * 0.6 + counter, 300+characterHeight, key, character[key], characterWidth, characterHeight)
          letters.push(newCharacter)
        })
        counter = counter + characterWidth*0.6
      })
      counter = 0
      backgroundLineThree.forEach((character) => {
        Object.keys(character).map((key) => {
          const newCharacter = new Letter(p.windowWidth * 0.6 + counter, 300+characterHeight*2, key, character[key], characterWidth, characterHeight)
          letters.push(newCharacter)
        })
        counter = counter + characterWidth*0.6
      })

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

    class Letter {
      constructor(X, Y, letter, color, charaterWidth, characterHeight) {
        this.location = p.createVector(X, Y)
        this.acceleration = p.createVector(0, 0)
        this.velocity = p.createVector(0, 0)
        this.letter = letter
        this.color = color
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
        this.color.setAlpha(100)
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
        const dragCeof = 0.03
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
          steering.setMag(0.5)
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