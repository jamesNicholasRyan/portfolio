import React, { useState } from 'react'
import axios from 'axios'

import linkedIn from '../images/linkedin.png'
import gitHub from '../images/GitHub.png'

export default function Contact() {
  const [success, updateSuccess] = useState(false)
  const [formData, updateFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  let contactHeight
  function calculateSize() {
    const { innerHeight: height } = window
    contactHeight = height + 4000
  }
  calculateSize()

  async function handleSubmit(event) {
    console.log('submitting data')
    event.preventDefault()
    try {
      const { data } = await axios.post('https://formspree.io/f/xpzkzwrw', formData)
      updateSuccess(true)
      console.log(data)
      updateFormData({
        name: "",
        email: "",
        message: "",
      })
    } catch (err) {
      console.log(err)
    }
  }

  function handleChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
    console.log(formData)
  }

  return <div 
    id='Contact'
    className='contactSection columns'
    style={{
      top: contactHeight
    }}
    >
    <div className='column is-centered'>
      <div className='skillsTitle'>Contact Me</div>
      <form onSubmit={handleSubmit} className='column is-three-fifths contactForm'>
        <div className="field">
          <label className="label whiteText">Name</label>
          <div className="control">
            <input 
              className="input" 
              type="text" 
              placeholder="Name..."
              value={formData.name}
              onChange={handleChange}
              name={'name'}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label whiteText">Email</label>
          <div className="control has-icons-right">
            <input 
              className="input" 
              type="email" 
              placeholder="Your email..." 
              value={formData.email}
              onChange={handleChange}
              name={'email'}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          </div>
          {/* <p className="help is-danger">This email is invalid</p> */}
        </div>

        <div className="field">
          <label className="label whiteText">Message</label>
          <div className="control">
            <textarea 
              className="textarea" 
              placeholder="type your message here..."
              rows='10'
              type='text'
              value={formData.message}
              onChange={handleChange}
              name={'message'}
            ></textarea>
          </div>
        </div>
        {!success ? <button className='button'>Submit</button>
          : <button className='button'>Message Received!</button>
        }
      </form>
    </div>

    <div className='column whiteText'>
      <div className='skillsTitle'>About this website</div>
      <div className='has-text is-size-3-desktop is-size-4-touch'>
        <p>This website’s interactive background was created by me, using the JavaScript library <a className='readmeLink' href='https://p5js.org/' target="_blank" rel="noreferrer">p5.js</a>.</p>
        <p>I utilised <a className='readmeLink' href='https://en.wikipedia.org/wiki/Boids' target="_blank" rel="noreferrer">Craig Reynolds</a> flocking behaviour rules to simulate fish, birds and bugs.</p>
        <p>have a go at popping those bubbles!</p>
      </div>
      <div className='has-text is-size-2-desktop is-size-4-touch myLinks'>
        {/* <p>My Links:</p> */}
        <p><img className='contactIcon' src={linkedIn} alt=''></img><a className='readmeLink' href='https://www.linkedin.com/in/james-n-ryan/' target="_blank" rel="noreferrer">LinkedIn</a></p>
        <p><img className='contactIcon' src={gitHub} alt=''></img><a className='readmeLink' href='https://github.com/jamesNicholasRyan' target="_blank" rel="noreferrer">GitHub</a></p>
        <p>j.n.ryan@hotmail.co.uk</p>
      </div>
    </div>
  </div>
}