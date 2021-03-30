import React from 'react'
import p5 from 'p5'
import { Boid, Bug, Bird } from './bug'

class Tree extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  Tree = (p) => {
    // Bubble[] bubbles = new Bubble[10]
    const canvasHeight = 2000
    const leaveCount = 100
    const dustCount = 50
    const birdCount = 10
    const bugCount = 15
    let leaves = []
    let dusts = []
    let flock = []
    let bugs = []
    var canvas
    const dustSpeed = [-0.3, 0.3]
    // const bubbleSpeed = [-10, 10]
    let angle = p.PI/6
    const leafSpeed = 0.7
    const gravity = p.createVector(0, 1)

    p.setup = () => {
      canvas = p.createCanvas(p.windowWidth, canvasHeight)
      canvas.position(0,0)
      canvas.style('z-index', '-1')
      const color1 = p.color(18,126,190)
      const color2 = p.color(255)
      setGradient(0,0,p.width,p.height,color1,color2)
      for (let i = 0; i < leaveCount; i++) {
        const xPosition = p.random(0, p.windowWidth)
        const yPosition = p.random(150, 250)
        const leaf = new Leaf(Math.ceil(xPosition/20)*20, Math.ceil(yPosition/20)*20, 1, 0, 0, p.random(1,385))
        leaf.calculateAge()
        leaves.push(leaf)
      }
      for (let i = 0; i < dustCount; i++) {
        const dust = new Dust(p.random(p.windowWidth), p.random(canvasHeight), p.random(4,7), randomSpeed(dustSpeed), randomSpeed(dustSpeed))
        dusts.push(dust)
      }
      for (let i = 0; i < birdCount; i++) {
        flock.push(new Bird())
      }
      for (let i = 0; i < bugCount; i++) {
        bugs.push(new Bug())
      }
    }

    p.draw = () => {
      const mouseVector = p.createVector(p.mouseX, p.mouseY)
      const color1 = p.color(18,126,190)
      const color2 = p.color(255)
      setGradient(0,0,p.width,p.height,color1,color2)
      dusts.forEach((dust) => {
        dust.display()
        dust.move()
        dust.checkSides()
      })

      for (let boid of flock) {
        boid.flock(flock)
        boid.move()
        boid.display()
        boid.checkEdges()
      }
      for (let boid of bugs) {
        boid.flock(bugs)
        boid.move()
        boid.display()
        boid.checkEdges()
      }

      drawTopBox()
      drawBottom()
      // drawCollisionBox1()
      // drawCollisionBox2()
      // drawCollisionBox3()
      leaves.forEach((leaf) => {
        leaf.display()
        leaf.grow()
        leaf.checkSides()
        
        if ((leaf.isFalling) && (!leaf.checkBottomCollision())) {
          const dist = leaf.location.dist(mouseVector)
          leaf.move()
          leaf.applyForce(gravity)
          leaf.drag()
          // leaf.applyForce(leaf.createWind())
          if ((dist < 150)) {
            leaf.applyForce(pushingForce(leaf).mult(-20))
          } else {
            leaf.applyForce(leaf.createWind())
          }
        } else if (leaf.checkBottomCollision()) {
          // console.log('collison!')
          leaf.isFalling = false
        }

        if (leaf.isDead) {
          const index = leaves.indexOf(leaf)
          leaves.splice(index, 1)
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

      if (leaves.length < leaveCount) {
        // console.log('makin more leaves!')
        const leaf = new Leaf(p.random(1)*p.width, p.random(175, 250), 1, 0, 0, 1)
        leaf.calculateAge()
        leaves.push(leaf)
      }

    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, canvasHeight)
    }

    // p.mousePressed = () => {
    //   bubbles.forEach((bubble) => {
    //     bubble.clicked()
    //   })
    // }

    function pushingForce(leaf) {
      // console.log('pushing leaves!')
      const mousePosition = p.createVector(p.mouseX, p.mouseY)
      const force = mousePosition.sub(leaf.location)
      let distance = force.mag()
      distance = p.constrain(distance,5.0,13.0)

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

    function randomSpeed(array) {
      return p.random(array[0], array[1])
    }

    function drawBottom() {
      p.fill(0, 15, 30)
      p.beginShape()
      p.vertex(0, p.height-90)
      p.vertex(p.width/7, p.height-60)
      p.vertex(p.width/6, p.height-70)
      p.vertex(p.width/5, p.height-80)
      p.vertex(p.width/4, p.height-70)
      p.vertex(p.width/3, p.height-120)
      p.vertex(p.width*0.666, p.height-120)
      p.vertex(p.width*0.75, p.height-70)
      p.vertex(p.width*0.80, p.height-80)
      p.vertex(p.width*0.88, p.height-70)
      p.vertex(p.width, p.height-90)
      p.vertex(p.width, p.height)
      p.vertex(0, p.height)
      p.endShape(p.CLOSE)
    }

    function drawTopBox() {
      p.fill(0, 14, 30)
      p.beginShape()
      p.vertex(0, 0)
      p.vertex(p.width, 0)
      p.vertex(p.width, 175)
      p.vertex(0, 175)
      p.endShape(p.CLOSE)
    }

    function drawCollisionBox1() {
      p.fill(255, 15, 30)
      p.rect(0, p.height-60, p.width)
    }
    function drawCollisionBox2() {
      p.fill(255, 15, 30)
      p.rect(p.width*0.29, p.height-90, p.width*0.42)
    }
    function drawCollisionBox3() {
      p.fill(255, 15, 30)
      p.rect(p.width*0.33, p.height-118, p.width*0.34)
    }

    function fractalTrees() {
      p.stroke(0, 15, 30)
      p.push()
      p.translate(p.width*0.07, 0)
      fractal(100)
      for (let i = 0; i < 6; i++) {
        p.translate(p.width*0.14, -100)
        fractal(100)
      }
      p.pop()
      p.translate(p.width*0.07, 0)
      fractal(100)
      for (let i = 0; i < 6; i++) {
        p.translate(p.width*0.7, -200)
        fractal(100)
      }
    }

    function fractal(len) {
      // angle = p.random(0,p.PI/3)
      // const angle = p.PI/3
      
      p.strokeWeight(8)
      p.line(0, 0, 0, len)
      p.translate(0, len)
      len *= 0.67
      if (len > 5) {
        p.push()
        p.rotate(angle)
        fractal(len)
        p.pop()
        p.push()
        p.rotate(-angle)
        fractal(len)
        p.pop()
      }
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
        this.color = p.color(p.random(0,116),p.random(184,188),p.random(200,222))
        this.color2 = p.color(157,219,234)
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
        this.acceleration.mult(0)
      }

      applyForce(force) {
        this.acceleration.add(force)
      }

      drag() {
        const dragCeof = 0.0001
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
    class Leaf extends Particle {
      constructor(X, Y, d, v1, v2, lifeSpan) {
        super(X, Y, d, v1, v2, lifeSpan)
        this.location = p.createVector(X, Y)
        this.acceleration = p.createVector(0, 0)
        this.velocity = p.createVector(v1, v2)
        this.diameter = d
        this.isDead = false
        this.lifeSpan = lifeSpan
        this.outOfBounds = false
        this.color1 = p.color(0, 255, 140)
        this.colorArray = [0, 255, 140]
        this.isFalling = false
        this.xoff = p.random(100)
        this.yoff = p.random(100)
      }

      display() {
        p.push()
        p.noStroke()
        p.fill(this.color1)
        p.translate(this.location.x, this.location.y)
        p.rotate(p.PI/4)
        p.rectMode(p.CENTER)
        p.rect(0, 0, this.diameter)
        p.pop()
      }

      calculateAge() {
        if (this.lifeSpan < 130) {
          const gap = 140-this.lifeSpan
          this.color1 = p.color(0, 255, gap)
          this.colorArray = [0, 255, gap]
        } else if (this.lifeSpan < 385) {
          const gap = this.lifeSpan-130
          this.color1 = p.color(gap, 255, 10)
          this.colorArray = [gap, 255, 10]
        } else if (this.lifeSpan < 640) {
          const gap = this.lifeSpan-385
          const gap2 = 255-gap
          this.color1 = p.color(255, gap2, 10)
          this.colorArray = [255, gap2, 10]
        }
        if (this.lifeSpan < 20) {
          this.diameter = this.lifeSpan
        } else {
          this.diameter = 20
        }
      }

      grow() {
        if (this.diameter < 20) {
          this.diameter = this.diameter + leafSpeed/9
        }

        if (this.lifeSpan < 130) {
          // console.log('blue now!')
          this.colorArray[2] = this.colorArray[2] - leafSpeed/2
          this.lifeSpan = this.lifeSpan + leafSpeed/2
        } else if (this.lifeSpan < 385) {
          // console.log('red now!')
          this.colorArray[0] = this.colorArray[0] + leafSpeed/4
          this.lifeSpan = this.lifeSpan + leafSpeed/4
        } else if (this.lifeSpan < 640) {
          // console.log('green now!')
          this.colorArray[1] = this.colorArray[1] - leafSpeed/5
          this.lifeSpan = this.lifeSpan + leafSpeed/5
          this.isFalling = true
        } else if (this.lifeSpan > 640) {
          // console.log('leaf is dead')
          this.isDead = true
        }
        this.color1  = p.color(this.colorArray[0], this.colorArray[1], this.colorArray[2])
      }

      createWind() {
        const xWind = p.map(p.noise(this.xoff), 0, 1, -1.5, 1.5 )
        const yWind = p.map(p.noise(this.yoff), 0, 1, -1, 2 )
        const windVector = p.createVector(xWind, yWind)
        this.xoff = this.xoff + 0.01
        this.yoff = this.yoff + 0.01
        return windVector
      }

      checkBottomCollision() {
        // console.log(this.location.y)
        if ((this.location.y > p.height-120) && (this.location.x > p.width*0.33) && (this.location.x < p.width*0.67)) {
          // p.width*0.33, p.height-118, p.width*0.34
          this.location.y = p.height - 119
          this.velocity = p.createVector(0,0)
          this.acceleration = p.createVector(0,0)
          return true
        } else if((this.location.y > p.height-90) && (this.location.x > p.width*0.29) && (this.location.x < p.width*0.71)) {
          // p.width*0.29, p.height-90, p.width*0.42
          this.location.y = p.height - 89
          this.velocity = p.createVector(0,0)
          this.acceleration = p.createVector(0,0)
          return true
        } else if (this.location.y > p.height - 60) {
          this.location.y = p.height - 59
          this.velocity = p.createVector(0,0)
          this.acceleration = p.createVector(0,0)
          return true
        } else {
          return false
        }
      }

      // checkDeath() {
      //   if (this.lifeSpan > 640) {
      //     this.isDead = true
      //   }
      // }

      // clicked() {
      //   const mouseVector = p.createVector(p.mouseX, p.mouseY)
      //   const dist = this.location.dist(mouseVector)
      //   if (dist < this.lifeSpan/2) {
      //     this.isDead = true
      //   }
      // }

      // checkCollision(other) {
      //   const otherLocation = other.location
      //   // const mouseVector = p.createVector(p.mosueX, p.mouseY)
      //   const dist = this.location.dist(otherLocation)
      //   if (dist < ((other.lifeSpan/2)+(this.lifeSpan/2))) {
      //     console.log('collision!')
      //     this.color = p.color(255)
      //     this.velocity.x = this.velocity.x * -1
      //     this.velocity.y = this.velocity.y * -1
      //     // this.isDead = true
      //   }
      // }

      // separate(bubbles) {
      //   // console.log('separating!')
      //   const maxSpeed = 300
      //   const maxForce = 300
      //   let sum = new p5.Vector()
      //   let count = 0
      //   const desiredSeparation = 20
      //   bubbles.forEach((bubble) => {
      //     const distance = this.location.dist(bubble.location)
      //     if ((distance > 0) && (distance < desiredSeparation)) {
      //       console.log('spearating!!!!')
      //       let diff = p.createVector()
      //       diff = this.location.sub(bubble.location)
      //       diff.normalize()
      //       diff.div(distance)
      //       sum.add(diff)
      //       count ++
      //     }
      //   })
      //   if (count > 0) {
      //     sum.div(count)
      //     sum.setMag(maxSpeed)
      //     const steer = sum.sub(this.velocity)
      //     steer.limit(maxForce)
      //     this.applyForce(steer)
      //   }
      // }
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

    // -----------------------------------  BOID  ----------------------------------------------------- //
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
      }

      display() {
        p.strokeWeight(16)
        p.fill(this.color)
        p.ellipse(this.location.x, this.location.y, this.diameter)
      }

      move() {
        this.location.add(this.velocity)
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

      contain() {
        let perceptionRadius = 300
        let steering = p.createVector()
        let diff = p.createVector()
        const limitLocationBottom = p.createVector(this.location.x, p.height-300)
        const limitLocationTop = p.createVector(this.location.x, 0)
        const distBottom = p.dist(this.location.x, this.location.y, limitLocationBottom.x, limitLocationBottom.y)
        const distTop = p.dist(this.location.x, this.location.y, limitLocationTop.x, limitLocationTop.y)
        if (distBottom < perceptionRadius) {
          diff = p5.Vector.sub(this.location, limitLocationBottom)
          diff.div(distBottom*2)
          steering.add(diff)
          steering.setMag(this.maxSpeed)
          steering.sub(this.velocity)
          steering.limit(0.1)
        } else if (distTop < perceptionRadius) {
          diff = p5.Vector.sub(this.location, limitLocationTop)
          diff.div(distTop)
          steering.add(diff)
          steering.setMag(this.maxSpeed)
          steering.sub(this.velocity)
          steering.limit(0.1)
        }
        return steering
      }

      flock(boids) {
        let alignment = this.align(boids)
        let cohesion = this.cohesion(boids)
        let separation = this.separation(boids)
        let contain = this.contain()
        this.acceleration.add(separation)
        this.acceleration.add(alignment)
        this.acceleration.add(cohesion)
        this.acceleration.add(contain)
      }
    }
    // ------------------------------------------------------------------------------------------------------- //
    class Bug extends Boid {
      constructor() {
        super()
        this.location = p.createVector(p.random(p.windowWidth), p.random(p.height-500, canvasHeight))
        this.maxForce = 0.01
        this.maxSpeed = 4
        this.perceptionRadius = 250
      }
      move() {
        this.location.add(this.velocity)
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxSpeed)
      }

      contain() {
        let perceptionRadius = 50
        let steering = p.createVector()
        let diff = p.createVector()
        const limitLocationBottom = p.createVector(this.location.x, p.height)
        const limitLocationTop = p.createVector(this.location.x, p.height-700)
        const distBottom = p.dist(this.location.x, this.location.y, limitLocationBottom.x, limitLocationBottom.y)
        const distTop = p.dist(this.location.x, this.location.y, limitLocationTop.x, limitLocationTop.y)
        if (distBottom < perceptionRadius) {
          diff = p5.Vector.sub(this.location, limitLocationBottom)
          diff.div(distBottom)
          steering.add(diff)
          steering.setMag(this.maxSpeed)
          steering.sub(this.velocity)
          steering.limit(0.08)
        } else if (distTop < perceptionRadius) {
          diff = p5.Vector.sub(this.location, limitLocationTop)
          diff.div(distTop)
          steering.add(diff)
          steering.setMag(this.maxSpeed)
          steering.sub(this.velocity)
          steering.limit(0.08)
        }
        return steering
      }
      flock(boids) {
        let alignment = this.align(boids)
        let cohesion = this.cohesion(boids)
        let contain = this.contain()
        this.acceleration.add(alignment)
        this.acceleration.add(cohesion)
        this.acceleration.add(contain)
      }
    }
    // -------------------------------------------- BIRD ----------------------------------------------------------- //
    class Bird extends Boid {
      constructor() {
        super()
        this.location = p.createVector(p.random(p.windowWidth), p.random(400, canvasHeight-700))
        this.maxForce = 0.1
        this.maxSpeed = 3
        this.perceptionRadius = 300
        this.diameter = 10
        this.color = p.color(0)
      }

      display() {
        let triangleSize = 20
        p.fill(0, 20, 40)
        // p.stroke(255)
        p.push();
        p.translate(this.location.x, this.location.y)
        p.rotate(this.velocity.heading() - p.radians(90))
        p.triangle(0,0,triangleSize,0,triangleSize / 2, triangleSize * 1.2)
        p.pop()
      }
    }

    // volcanoes(p.windowWidth/5, canvasHeight-100)
    // volcanoes(p.windowWidth*0.8, canvasHeight-100)
  }

// ______________________________________________________________________________________________________ //
  componentDidMount() {
    this.myP5 = new p5(this.Tree, this.myRef.current)
  }

  render() {
    return <div ref={this.myRef}>
    </div>
  }
}


export default Tree
