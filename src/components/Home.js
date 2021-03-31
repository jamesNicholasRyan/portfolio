import React from 'react'
import p5 from 'p5'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  Home = (p) => {
    var canvas

    p.setup = () => {
      console.log('setup!')
      canvas = p.createCanvas(p.windowWidth, p.windowHeight)
      canvas.position(0, 0)
      canvas.style('z-index', '-1')
    }

    p.draw = () => {
      p.background(0, 15, 30)
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