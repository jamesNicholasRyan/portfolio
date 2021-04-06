// import p5 from 'p5'

// const canvasHeight = 2000

// class Boid {
//   constructor() {
//     this.myP5 = new p5(this.Boid, this.myRef.current)
//     this.location = p5.createVector(p5.random(p5.windowWidth), p5.random(canvasHeight-700))
//     this.velocity = p5.Vector.random2D()
//     this.velocity.setMag(p5.random(2, 4))
//     this.acceleration = p5.createVector()
//     this.maxForce = 0.2
//     this.maxSpeed = 4
//     this.perceptionRadius = 100
//     this.diameter = 5
//     this.color = p5.color(70, 200)
//   }

//   display() {
//    p5.strokeWeight(16)
//    p5.fill(this.color)
//    p5.ellipse(this.location.x, this.location.y, this.diameter)
//   }

//   move() {
//     this.location.add(this.velocity)
//     this.velocity.add(this.acceleration)
//     this.velocity.limit(this.maxSpeed)
//     this.acceleration.mult(0)
//   }

//   checkEdges() {
//     if (this.location.x > p5.width) {
//       this.location.x = 0 
//     } else if (this.location.x < 0) {
//       this.location.x = p5.width
//     }
//     if (this.location.y > p5.height) {
//       this.location.y = 0 
//     } else if (this.location.y < 0) {
//       this.location.y = p5.height
//     }
//   }

//   align(boids) {
//     let steering = p5.createVector()
//     let total = 0
//     for (let other of boids) {
//       const dist = p5.dist(this.location.x, this.location.y, other.location.x, other.location.y)
//       if (other !== this && dist < this.perceptionRadius) {
//         steering.add(other.velocity)
//         total ++
//       }
//     }
//     if (total > 0) {
//       steering.div(total)
//       steering.setMag(this.maxSpeed)
//       steering.sub(this.velocity)
//       steering.limit(this.maxForce)
//     }
//     return steering
//   }

//   cohesion(boids) {
//     let steering = p5.createVector()
//     let total = 0
//     for (let other of boids) {
//       const dist = p5.dist(this.location.x, this.location.y, other.location.x, other.location.y)
//       if (other !== this && dist < this.perceptionRadius) {
//         steering.add(other.location)
//         total ++
//       }
//     }
//     if (total > 0) {
//       steering.div(total)
//       steering.sub(this.location)
//       steering.setMag(this.maxSpeed)
//       steering.sub(this.velocity)
//       steering.limit(this.maxForce)
//     }
//     return steering
//   }

//   separation(boids) {
//     let perceptionRadius = 100
//     let steering = p5.createVector()
//     let total = 0
//     for (let other of boids) {
//       const dist = p5.dist(this.location.x, this.location.y, other.location.x, other.location.y)
//       if (other !== this && dist < perceptionRadius) {
//         let diff = p5.Vector.sub(this.location, other.location)
//         diff.div(dist)
//         steering.add(diff)
//         total ++
//       }
//     }
//     if (total > 0) {
//       steering.div(total)
//       steering.setMag(this.maxSpeed)
//       steering.sub(this.velocity)
//       steering.limit(0.12)
//     }
//     return steering
//   }

//   contain() {
//     let perceptionRadius = 300
//     let steering = p5.createVector()
//     let diff = p5.createVector()
//     const limitLocationBottom = p5.createVector(this.location.x, p5.height-300)
//     const limitLocationTop = p5.createVector(this.location.x, 0)
//     const distBottom = p5.dist(this.location.x, this.location.y, limitLocationBottom.x, limitLocationBottom.y)
//     const distTop = p5.dist(this.location.x, this.location.y, limitLocationTop.x, limitLocationTop.y)
//     if (distBottom < perceptionRadius) {
//       diff = p5.Vector.sub(this.location, limitLocationBottom)
//       diff.div(distBottom*2)
//       steering.add(diff)
//       steering.setMag(this.maxSpeed)
//       steering.sub(this.velocity)
//       steering.limit(0.1)
//     } else if (distTop < perceptionRadius) {
//       diff = p5.Vector.sub(this.location, limitLocationTop)
//       diff.div(distTop)
//       steering.add(diff)
//       steering.setMag(this.maxSpeed)
//       steering.sub(this.velocity)
//       steering.limit(0.1)
//     }
//     return steering
//   }

//   flock(boids) {
//     let alignment = this.align(boids)
//     let cohesion = this.cohesion(boids)
//     let separation = this.separation(boids)
//     let contain = this.contain()
//     this.acceleration.add(separation)
//     this.acceleration.add(alignment)
//     this.acceleration.add(cohesion)
//     this.acceleration.add(contain)
//   }
// }
// // ------------------------------------------------------------------------------------------------------- //
// class Bug extends Boid {
//   constructor() {
//     super()
//     this.location = p5.createVector(p5.random(p5.windowWidth), p5.random(p5.height-500, canvasHeight))
//     this.maxForce = 0.01
//     this.maxSpeed = 4
//     this.perceptionRadius = 250
//   }
//   move() {
//     this.location.add(this.velocity)
//     this.velocity.add(this.acceleration)
//     this.velocity.limit(this.maxSpeed)
//   }

//   contain() {
//     let perceptionRadius = 50
//     let steering = p5.createVector()
//     let diff = p5.createVector()
//     const limitLocationBottom = p5.createVector(this.location.x, p5.height)
//     const limitLocationTop = p5.createVector(this.location.x, p5.height-700)
//     const distBottom = p5.dist(this.location.x, this.location.y, limitLocationBottom.x, limitLocationBottom.y)
//     const distTop = p5.dist(this.location.x, this.location.y, limitLocationTop.x, limitLocationTop.y)
//     if (distBottom < perceptionRadius) {
//       diff = p5.Vector.sub(this.location, limitLocationBottom)
//       diff.div(distBottom)
//       steering.add(diff)
//       steering.setMag(this.maxSpeed)
//       steering.sub(this.velocity)
//       steering.limit(0.08)
//     } else if (distTop < perceptionRadius) {
//       diff = p5.Vector.sub(this.location, limitLocationTop)
//       diff.div(distTop)
//       steering.add(diff)
//       steering.setMag(this.maxSpeed)
//       steering.sub(this.velocity)
//       steering.limit(0.08)
//     }
//     return steering
//   }
//   flock(boids) {
//     let alignment = this.align(boids)
//     let cohesion = this.cohesion(boids)
//     let contain = this.contain()
//     this.acceleration.add(alignment)
//     this.acceleration.add(cohesion)
//     this.acceleration.add(contain)
//   }
// }
// // -------------------------------------------- BIRD ----------------------------------------------------------- //
// class Bird extends Boid {
//   constructor() {
//     super()
//     this.location = p5.createVector(p5.random(p5.windowWidth), p5.random(400, canvasHeight-700))
//     this.maxForce = 0.1
//     this.maxSpeed = 3
//     this.perceptionRadius = 300
//     this.diameter = 10
//     this.color = p5.color(0)
//   }

//   display() {
//     let triangleSize = 20
//    p5.fill(0, 20, 40)
//     // p5.stroke(255)
//    p5.push();
//    p5.translate(this.location.x, this.location.y)
//    p5.rotate(this.velocity.heading() - p5.radians(90))
//    p5.triangle(0,0,triangleSize,0,triangleSize / 2, triangleSize * 1.2)
//    p5.pop()
//   }
// }

// export {
//   Boid,
//   Bug,
//   Bird
// }