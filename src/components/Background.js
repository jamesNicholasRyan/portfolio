import React from 'react'
import p5 from 'p5'

class Background extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  Background = (p) => {

    // Bubble[] bubbles = new Bubble[10]
    const canvasHeight = 2000
    const bubbleCount = 30
    let bubbles= []
    var canvas

    p.setup = () => {
      canvas = p.createCanvas(p.windowWidth, canvasHeight)
      canvas.position(0,0)
      canvas.style('z-index', '-2')
      for (let i = 0; i < bubbleCount; i++) {
        const bubble = new Bubble(p.random(p.windowWidth), p.random(canvasHeight), p.random(1,5))
        bubbles.push(bubble)
      }
    }

    p.draw = () => {
      const mouseVector = p.createVector(p.mouseX, p.mouseY)
      // p.background(18,126,190)
      const color1 = p.color(18,126,190)
      const color2 = p.color(0)
      setGradient(0,0,p.width,p.height,color1,color2)
      bubbles.forEach((bubble) => {
        bubble.display()
        bubble.move()
        bubble.drag()
        bubble.checkSides()
        // bubble.separate(bubbles)

        // bubbles.forEach((bubble2) => {
        //   if (bubble !== bubble2) {
        //     bubble.checkCollision(bubble2)
        //   }
        // })

        const dist = bubble.location.dist(mouseVector)
        if ((dist < 100)) {
          bubble.applyForce(pushingForce(bubble).mult(-1))
        }
      })

      bubbles.forEach((bubble) => {
        if (bubble.lifeSpan < 0) {
          if ((bubbles.length < 60) && (!bubble.outOfBounds)) {
            for (let i = 0; i < 2; i++) {
              const newBubble = new Bubble(bubble.location.x, bubble.location.y, p.random(10,30))
              bubbles.push(newBubble)
            }
          }
          const index = bubbles.indexOf(bubble)
          bubbles.splice(index, 1)
        }
      })

      if (bubbles.length < 35) {
        const bubble = new Bubble(p.random(p.windowWidth), p.random(canvasHeight), p.random(50))
        bubbles.push(bubble)
      }
  
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
    }

    p.mousePressed = () => {
      bubbles.forEach((bubble) => {
        bubble.clicked()
      })
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

    function setGradient(x,y,w,h,c1,c2) {
      p.noFill()
      for (let i = y; i <= y + h; i++) {
        let inter = p.map(i, y, y + h, 0, 1)
        let c = p.lerpColor(c1, c2, inter)
        p.stroke(c)
        p.line(x, i, x + w, i)
      }

    }

    
    // --------------------------- BUBBLE CLASS ---------------------------------------- // 
    class Bubble {

      constructor(X, Y, d) {
        this.location = p.createVector(X, Y)
        this.acceleration = p.createVector(0, 0)
        this.velocity = p.createVector(p.random(-10,10), p.random(-10,10))
        this.diameter = d
        this.isDead = false
        this.lifeSpan = d
        this.color = p.color(p.random(0,116),p.random(184,188),p.random(200,222))
        this.color2 = p.color(157,219,234)
        this.outOfBounds = false
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
          this.color = p.color(157,219,255)
          this.color2 = p.color(157,219,255)
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

      clicked() {
        const mouseVector = p.createVector(p.mouseX, p.mouseY)
        const dist = this.location.dist(mouseVector)
        if (dist < this.lifeSpan/2) {
          this.isDead = true
        }
      }

      checkCollision(other) {
        const otherLocation = other.location
        // const mouseVector = p.createVector(p.mosueX, p.mouseY)
        const dist = this.location.dist(otherLocation)
        if (dist < ((other.lifeSpan/2)+(this.lifeSpan/2))) {
          console.log('collision!')
          this.color = p.color(255)
          this.velocity.x = this.velocity.x * -1
          this.velocity.y = this.velocity.y * -1
          // this.isDead = true
        }
      }

      separate(bubbles) {
        // console.log('separating!')
        const maxSpeed = 300
        const maxForce = 300
        let sum = new p5.Vector()
        let count = 0
        const desiredSeparation = 20
        bubbles.forEach((bubble) => {
          const distance = this.location.dist(bubble.location)
          if ((distance > 0) && (distance < desiredSeparation)) {
            console.log('spearating!!!!')
            let diff = p.createVector()
            diff = this.location.sub(bubble.location)
            diff.normalize()
            diff.div(distance)
            sum.add(diff)
            count ++
          }
        })
        if (count > 0) {
          sum.div(count)
          sum.setMag(maxSpeed)
          const steer = sum.sub(this.velocity)
          steer.limit(maxForce)
          this.applyForce(steer)
        }
      }

      checkSides() {
        if ((this.location.x < (0-this.diameter)) || (this.location.x > (p.windowWidth + this.diameter)) 
          || (this.location.y > canvasHeight+this.diameter) || (this.location.y < 0-this.diameter)) {
          this.isDead = true
          this.outOfBounds = true
        }
      }

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
