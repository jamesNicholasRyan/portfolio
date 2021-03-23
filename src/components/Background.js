import React from 'react'
import p5 from 'p5'

class Background extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  Background = (p) => {

    // --------------------------- BUBBLE CLASS ---------------------------------------- // 

    class Bubble {

      constructor(X, Y, d) {
        this.location = p.createVector(X, Y)
        this.acceleration = p.createVector(0, 0)
        this.velocity = p.createVector(p.random(-10,10), p.random(-10,10))
        this.diameter = d
        this.isDead = false
        this.lifeSpan = d
        this.color = p.color(112,186,220)
        this.color2 = p.color(157,219,234)
      }

      display() {
        p.noStroke()
        p.fill(this.color)
        p.ellipse(this.location.x, this.location.y, this.lifeSpan, this.lifeSpan)
        p.fill(this.color2)
        p.ellipse(this.location.x + (this.lifeSpan/5), this.location.y - (this.lifeSpan/5), this.lifeSpan/3, this.lifeSpan/3)
        
        if (this.lifeSpan > 50) {
          this.isDead = true
        }
        if (this.isDead === true) {
          this.color = (255)
          this.color2 = (255)
          this.lifeSpan = this.lifeSpan - 3
        } else if (this.isDead === false) {
          this.lifeSpan = this.lifeSpan + 0.03
        }
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

      checkCollision(other) {
        // const otherLocation = other.location
        // const mouseVector = p.createVector(p.mosueX, p.mouseY)
        // const dist = this.location.dist(mouseVector)
        // if (dist < 50) {
        //   console.log('collision!')
        //   console.log(dist)
        //   this.velocity.x = p.abs(this.velocity.x)
        //   this.velocity.y = p.abs(this.velocity.y)
        //   // this.isDead = true
        // }
      }

      checkSides() {
        if ((this.location.x < (0-this.diameter)) || (this.location.x > (p.windowWidth + this.diameter)) 
          || (this.location.y > p.windowHeight+this.diameter) || (this.location.y < 0-this.diameter)) {
          this.isDead = true
        }
      }

    }
    // Bubble[] bubbles = new Bubble[10]
    const bubbleCount = 3
    let bubbles= []
    var canvas

    p.setup = () => {
      canvas = p.createCanvas(p.windowWidth, p.windowHeight)
      canvas.position(0,0)
      canvas.style('z-index', '-2')
      for (let i = 0; i < bubbleCount; i++) {
        const bubble = new Bubble(p.random(p.windowWidth), p.random(p.windowHeight), p.random(5))
        bubbles.push(bubble)
      }
    }

    p.draw = () => {
      const mouseVector = p.createVector(p.mouseX, p.mouseY)
      p.background(18,126,190)
      bubbles.forEach((bubble) => {
        bubble.display()
        bubble.move()
        bubble.drag()
        bubble.checkSides()

        bubbles.forEach((bubble2) => {
          bubble.checkCollision(bubble2)
        })
        // console.log(bubble.lifeSpan)
        if (bubble.lifeSpan < 0) {
          const index = bubbles.indexOf(bubble)
          bubbles.splice(index, 1)
        }
        const dist = bubble.location.dist(mouseVector)
        if ((p.mouseIsPressed) && (dist < 100)) {
          bubble.applyForce(pushingForce(bubble))
        }
      })

      if (bubbles.length < 3) {
        const bubble = new Bubble(p.random(p.windowWidth), p.random(p.windowHeight), p.random(50))
        bubbles.push(bubble)
      }
  
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
    }

    function pushingForce(bubble) {
      const mousePosition = p.createVector(p.mouseX, p.mouseY)
      const force = mousePosition.sub(bubble.location)
      let distance = force.mag()
      distance = p.constrain(distance,5.0,25.0)

      force.normalize()
      const strength = (0.04 * 20 * 20) / (distance * distance)
      force.mult(strength)
      return force
    }

  }

  componentDidMount() {
    this.myP5 = new p5(this.Background, this.myRef.current)
  }


  render() {
    return <div ref={this.myRef}>
    </div>
  }
}

export default Background
