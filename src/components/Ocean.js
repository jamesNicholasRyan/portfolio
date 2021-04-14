import React from 'react'
import p5 from 'p5'
import Skills from './Skills'

// "eslintConfig": {
//   "extends": [
//     "react-app",
//     "react-app/jest"
//   ]
// },

class Ocean extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  Ocean = (p) => {
    const canvasHeight = 2000
    const bubbleCount = 30
    const dustCount = 50
    const fishCount = 50
    let bubbles = []
    let dusts = []
    let fishes = []
    var canvas
    const dustSpeed = [-0.3, 0.3]
    const bubbleSpeed = [-10, 10]
    let bg

    p.preload = () => {
      bg = p.loadImage('https://i.imgur.com/K51YGkp.png')
    }

    p.setup = () => {
      p.pixelDensity(1)
      canvas = p.createCanvas(p.windowWidth, canvasHeight)
      canvas.position(0, 1200 + p.windowHeight)
      canvas.style('z-index', '-1')
      for (let i = 0; i < bubbleCount; i++) {
        const bubble = new Bubble(p.random(p.windowWidth), p.random(canvasHeight), p.random(1,45), randomSpeed(bubbleSpeed), randomSpeed(bubbleSpeed))
        bubbles.push(bubble)
      }
      for (let i = 0; i < dustCount; i++) {
        const dust = new Dust(p.random(p.windowWidth), p.random(canvasHeight), p.random(4,7), randomSpeed(dustSpeed), randomSpeed(dustSpeed))
        dusts.push(dust)
      }
      for (let i = 0; i < fishCount; i++) {
        const newFish = new Fish(p.random(p.windowWidth), p.random(canvasHeight))
        fishes.push(newFish)
      }

    }

    p.draw = () => {
      p.background(bg)
      const mouseVector = p.createVector(p.mouseX, p.mouseY)
      // const color1 = p.color(18,126,190)
      // const color2 = p.color(0, 10, 20)
      fishes.forEach((boid) => {
        boid.display()
        boid.move()
        boid.checkEdges()
        boid.flock(fishes)
      })
      bubbles.forEach((bubble) => {
        bubble.display()
        bubble.move()
        bubble.drag()
        bubble.checkSides()
        bubble.checkDeath()
        bubble.boyancy()

        const dist = bubble.location.dist(mouseVector)
        if ((dist < 100)) {
          bubble.applyForce(pushingForce(bubble).mult(-1))
        }
      })
      dusts.forEach((dust) => {
        dust.display()
        dust.move()
        dust.checkSides()
      })
      
      bubbles.forEach((bubble) => {
        if (bubble.lifeSpan < 0) {
          if ((bubbles.length < 60) && (!bubble.outOfBounds)) {
            for (let i = 0; i < 2; i++) {
              const newBubble = new Bubble(bubble.location.x, bubble.location.y, p.random(10,30), randomSpeed(bubbleSpeed), randomSpeed(bubbleSpeed))
              bubbles.push(newBubble)
            }
          }
          const index = bubbles.indexOf(bubble)
          bubbles.splice(index, 1)
        }
      })

      dusts.forEach((dust) => {
        if (dust.isDead === true) {
          const newDust = new Dust(p.random(p.windowWidth), p.random(canvasHeight), p.random(4,8), randomSpeed(dustSpeed), randomSpeed(dustSpeed))
          dusts.push(newDust)
          const index = dusts.indexOf(dust)
          dusts.splice(index, 1)
        }
      })

      if (bubbles.length < 50) {
        const bubble = new Bubble(p.random(p.windowWidth), p.random(canvasHeight), p.random(1,5), randomSpeed(bubbleSpeed), randomSpeed(bubbleSpeed))
        bubbles.push(bubble)
      }

      // const text = p.frameRate()
      // p.fill(255)
      // p.text(text, 500, 1000)

      drawBottom()
      drawTop()
    }

    function volcanoes(x, y) {
      const bubbleSpeedUp = [15, 20]
      const bubbleSpeedSide = [-3, 3]
      const volcanoBubble = new Bubble(x, y, p.random(1,5), randomSpeed(bubbleSpeedSide), randomSpeed(bubbleSpeedUp))
      bubbles.push(volcanoBubble)
      const interval = randomSpeed([1200,2000])
      setTimeout(() => volcanoes(x, y), interval)
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
      bubbles = []
      dusts = []
      fishes = []
      p.setup()
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

    function randomSpeed(array) {
      return p.random(array[0], array[1])
    }

    function drawBottom() {
      p.fill(0, 5, 10)
      p.beginShape()
      p.vertex(0, p.height-30)
      p.vertex(p.width/7, p.height-60)
      p.vertex(p.width/6, p.height-70)
      p.vertex(p.width/5, p.height-100)
      p.vertex(p.width/4, p.height-70)
      p.vertex(p.width/3, p.height-60)
      p.vertex(p.width/2, p.height-70)
      p.vertex(p.width*0.6, p.height-60)
      p.vertex(p.width*0.75, p.height-70)
      p.vertex(p.width*0.8, p.height-100)
      p.vertex(p.width*0.86, p.height-70)
      p.vertex(p.width*0.88, p.height-60)
      p.vertex(p.width, p.height-30)
      p.vertex(p.width, p.height)
      p.vertex(0, p.height)
      p.endShape(p.CLOSE)
    }

    function drawTop() {
      p.fill(0, 15, 30)
      p.beginShape()
      p.vertex(0, 0)
      p.vertex(p.width, 0)
      p.vertex(p.width, p.height*0.26)
      p.vertex(p.width*0.8, p.height*0.30)
      p.vertex(p.width*0.5, p.height*0.29)
      p.vertex(p.width*0.2, p.height*0.30)
      p.vertex(0, p.height*0.28)
      p.endShape(p.CLOSE)
    }

    
    // --------------------------- CLASSES ---------------------------------------- // 
    class Particle {
      constructor(X, Y, d, v1, v2) {
        this.location = p.createVector(X, Y)
        this.acceleration = p.createVector(0, 0)
        this.velocity = p.createVector(v1, v2)
        this.diameter = d
        this.isDead = false
        this.lifeSpan = d
        this.outOfBounds = false
        this.color = p.color(p.random(0,116),p.random(184,188),p.random(200,222), 50)
        this.color2 = p.color(157,219,234, 100)
      }

      display() {
        p.noStroke()
        p.fill(this.color)
        p.ellipse(this.location.x, this.location.y, this.lifeSpan, this.lifeSpan)
        p.fill(this.color2)
        p.ellipse(this.location.x + (this.lifeSpan/5), this.location.y - (this.lifeSpan/5), this.lifeSpan/3, this.lifeSpan/3)
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

      checkSides() {
        if ((this.location.x < (0-this.diameter)) || (this.location.x > (p.windowWidth + this.diameter)) 
          || (this.location.y > canvasHeight+this.diameter) || (this.location.y < 0-this.diameter)) {
          this.isDead = true
          this.outOfBounds = true
        }
      }
    }

// -------------------------------------------------------------------------------------------------------------------- //
    class Bubble extends Particle {
      constructor(X, Y, d, v1, v2) {
        super(X, Y, d, v1, v2)
      }

      checkDeath() {
        if (this.lifeSpan > 50) {
          this.isDead = true
        }
        if (this.isDead === true) {
          this.color = p.color(157,219,255, 150)
          this.color2 = p.color(157,219,255, 150)
          this.lifeSpan = this.lifeSpan - 3
        } else if (this.isDead === false) {
          this.lifeSpan = this.lifeSpan + 0.03
        }
      }

      clicked() {
        const mouseVector = p.createVector(p.mouseX, p.mouseY)
        const dist = this.location.dist(mouseVector)
        if (dist < this.lifeSpan/2) {
          this.isDead = true
        }
      }

      boyancy() {
        let boyance
        let lift
        if (this.location.y > canvasHeight/5) {
          lift = p.map(this.location.y, canvasHeight/5, canvasHeight, 0, -0.008)
          boyance = p.createVector(0, lift)
        } else {
          boyance = p.createVector(0,0)
        }
        // console.log(boyance)
        this.applyForce(boyance)
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
    }

    // ------------------------------------------------------------------------------------------ //
    class Dust extends Particle {
      constructor(X, Y, d, v1, v2) {
        super(X, Y, d, v1, v2)
        this.color = p.color(p.random(100,170), p.random(100,170))
      }

      display() {
        p.noStroke()
        p.fill(this.color)
        p.ellipse(this.location.x, this.location.y, this.lifeSpan, this.lifeSpan)
      }
    }
    // ---------------------------------------------------------------------------------------- //
    class Boid {
      constructor() {
        this.location = p.createVector(p.random(p.windowWidth), p.random(canvasHeight-700))
        this.velocity = p5.Vector.random2D()
        this.velocity.setMag(p.random(2, 4))
        this.acceleration = p.createVector()
        this.maxForce = 0.2
        this.maxSpeed = 4
        this.perceptionRadius = 100
        this.diameter = 5
        this.color = p.color(70, 200)
        this.fleeing = false
      }

      display() {
        p.strokeWeight(16)
        p.fill(this.color)
        p.ellipse(this.location.x, this.location.y, this.diameter)
      }

      move() {
        if (this.fleeing) {
          this.location.add(this.velocity)
        } else {
          const oldY = this.velocity.y
          const newY = p.constrain(oldY, -0.8, 0.8)
          const newVelocity =  p.createVector(this.velocity.x, newY)
          this.location.add(newVelocity)
        }
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxSpeed)
        this.acceleration.mult(0)
      }

      checkEdges() {
        if (this.location.x > p.width) {
          this.location.x = 0 
        } else if (this.location.x < 0) {
          this.location.x = p.width
        }
        if (this.location.y > p.height) {
          this.location.y = 0 
        } else if (this.location.y < 0) {
          this.location.y = p.height
        }
      }

      align(boids) {
        let steering = p.createVector()
        let total = 0
        for (let other of boids) {
          const dist = p.dist(this.location.x, this.location.y, other.location.x, other.location.y)
          if (other !== this && dist < this.perceptionRadius) {
            steering.add(other.velocity)
            total ++
          }
        }
        if (total > 0) {
          steering.div(total)
          steering.setMag(this.maxSpeed)
          steering.sub(this.velocity)
          steering.limit(this.maxForce)
        }
        return steering
      }

      cohesion(boids) {
        let steering = p.createVector()
        let total = 0
        for (let other of boids) {
          const dist = p.dist(this.location.x, this.location.y, other.location.x, other.location.y)
          if (other !== this && dist < this.perceptionRadius) {
            steering.add(other.location)
            total ++
          }
        }
        if (total > 0) {
          steering.div(total)
          steering.sub(this.location)
          steering.setMag(this.maxSpeed)
          steering.sub(this.velocity)
          steering.limit(this.maxForce)
        }
        return steering
      }

      separation(boids) {
        let perceptionRadius = 100
        let steering = p.createVector()
        let total = 0
        for (let other of boids) {
          const dist = p.dist(this.location.x, this.location.y, other.location.x, other.location.y)
          if (other !== this && dist < perceptionRadius) {
            let diff = p5.Vector.sub(this.location, other.location)
            diff.div(dist)
            steering.add(diff)
            total ++
          }
        }
        if (total > 0) {
          steering.div(total)
          steering.setMag(this.maxSpeed)
          steering.sub(this.velocity)
          steering.limit(0.12)
        }
        return steering
      }

      avoid() {
        const mouseVector = p.createVector(p.mouseX, p.mouseY)
        let perceptionRadius = 200
        let steering = p.createVector()
        const dist = p.dist(this.location.x, this.location.y, p.mouseX, p.mouseY)
        if (dist < perceptionRadius) {
          // console.log('fleeing')
          this.fleeing = true
          let diff = p5.Vector.sub(this.location, mouseVector)
          diff.div(dist)
          steering.add(diff)
          steering.setMag(this.maxSpeed*4)
          steering.sub(this.velocity)
          steering.limit(10)
        } else {
          this.fleeing = false
        }
        return steering
      }

      flock(boids) {
        let avoid = this.avoid()
        let alignment = this.align(boids)
        let cohesion = this.cohesion(boids)
        let separation = this.separation(boids)
        if (this.fleeing) {
          this.acceleration.add(avoid)
        } else {
          this.acceleration.add(separation)
          this.acceleration.add(alignment)
          this.acceleration.add(cohesion)
        }
      }
    }
    // -------------------------------------------- FISH ----------------------------------------------------------- //
    class Fish extends Boid {
      constructor() {
        super()
        this.location = p.createVector(p.random(p.windowWidth), p.random(400, canvasHeight-700))
        this.maxForce = 0.1
        this.maxSpeed = 3
        this.perceptionRadius = 200
        this.diameter = 10
        this.color = p.color(0)
      }

      display() {
        p.fill(0, 20, 40)
        p.ellipse(this.location.x, this.location.y, 10, 5)
      }
    }

    volcanoes(p.windowWidth/5, canvasHeight-100)
    volcanoes(p.windowWidth*0.8, canvasHeight-100)
  }

// ______________________________________________________________________________________________________ //
  componentDidMount() {
    this.myP5 = new p5(this.Ocean, this.myRef.current)
  }

  render() {
    return <div ref={this.myRef}>
    </div>
  }
}

export {
  Ocean
}
