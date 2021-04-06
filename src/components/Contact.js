import React, { useState } from 'react'
import axios from 'axios'

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
    id='contact'
    className='contactSection'
    style={{
      top: contactHeight
    }}
    >
    <div className='skillsTitle'>
      Contact Me
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
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
          <label className="label">Email</label>
          <div className="control has-icons-left has-icons-right">
            <input 
              className="input" 
              type="email" 
              placeholder="Email input" 
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
          <label className="label">Message</label>
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
  </div>
  
}