import React from 'react'
import p5 from 'p5'

class Tree extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  Tree = (p) => {
    // Bubble[] bubbles = new Bubble[10]
    const canvasHeight = 2000
    const leaveCount = 76
    const dustCount = 50
    let leaves = []
    let dusts = []
    var canvas
    const dustSpeed = [-0.3, 0.3]
    // const bubbleSpeed = [-10, 10]
    let angle = p.PI/6
    const leafSpeed = 0.7
    const gravity = p.createVector(0, 0.001)

    p.setup = () => {
      canvas = p.createCanvas(p.windowWidth, canvasHeight)
      canvas.position(0,0)
      canvas.style('z-index', '-1')
      for (let i = 0; i < leaveCount; i++) {
        const leaf = new Leaf(p.random(1)*p.width, p.random(175, 250), 1, 0, 0, p.random(1,385))
        leaf.calculateAge()
        leaves.push(leaf)
      }
      for (let i = 0; i < dustCount; i++) {
        const dust = new Dust(p.random(p.windowWidth), p.random(canvasHeight), p.random(4,7), randomSpeed(dustSpeed), randomSpeed(dustSpeed))
        dusts.push(dust)
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
      leaves.forEach((leaf) => {
        leaf.display()
        leaf.move()
        leaf.grow()

        if (leaf.isFalling) {
          leaf.applyForce(gravity)
        }
        if (leaf.isDead) {
          const index = leaves.indexOf(leaf)
          leaves.splice(index, 1)
        }
        // leaf.drag()

        // const dist = leaf.location.dist(mouseVector)
        // if ((dist < 100)) {
        //   leaf.applyForce(pushingForce(leaf).mult(-1))
        // }
      })
      
      // leaves.forEach((leaf) => {
      //   
      // })

      dusts.forEach((dust) => {
        if (dust.isDead === true) {
          const newDust = new Dust(p.random(p.windowWidth), p.random(canvasHeight), p.random(4,8), randomSpeed(dustSpeed), randomSpeed(dustSpeed))
          dusts.push(newDust)
          const index = dusts.indexOf(dust)
          dusts.splice(index, 1)
        }
      })

      if (leaves.length < 80) {
        console.log('makin more leaves!')
        const leaf = new Leaf(p.random(1)*p.width, p.random(175, 250), 1, 0, 0, 1)
        leaf.calculateAge()
        leaves.push(leaf)
      }


      drawTree()
      drawTopBox()

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
      const mousePosition = p.createVector(p.mouseX, p.mouseY)
      const force = mousePosition.sub(leaf.location)
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

    function randomSpeed(array) {
      return p.random(array[0], array[1])
    }

    function drawTree() {
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
      }

      display() {
        p.noStroke()
        p.fill(this.color1)
        p.rect(this.location.x, this.location.y, this.diameter)
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
    // ---------------------------------------------------------------------------------------- //

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
