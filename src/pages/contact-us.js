import React from 'react'
import Layout from '../layout'
import { navigate } from 'gatsby'
import Recaptcha from 'react-google-recaptcha'

import '../css/contact-us.css'

const RECAPTCHA_KEY = process.env.GATSBY_APP_SITE_RECAPTCHA_KEY
if (typeof RECAPTCHA_KEY === 'undefined') {
  throw new Error(`
  Env var GATSBY_APP_SITE_RECAPTCHA_KEY is undefined! 
  You probably forget to set it in your Netlify build environment variables. 
  Make sure to get a Recaptcha key at https://www.netlify.com/docs/form-handling/#custom-recaptcha-2-with-your-own-settings
  Note this demo is specifically for Recaptcha v2
  `)
}

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}


export default function Index() {
    const [state, setState] = React.useState({})
  const recaptchaRef = React.createRef()

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const recaptchaValue = recaptchaRef.current.getValue()
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        'g-recaptcha-response': recaptchaValue,
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }
  return (
    <Layout>
      <div className="contact">
      <h1>Connect with us</h1>
      <p>Like with your internal teams, we will be just a call away, to help with your digital transformation. Our first contact will be within 24 hours of the form submission.</p>
<form
        name="contact-recaptcha"
        method="post"
        action="/thanks/"
        data-netlify="true"
        data-netlify-recaptcha="true"
        onSubmit={handleSubmit}
      >
        <noscript>
          <p>This form won’t work with Javascript disabled</p>
        </noscript>
      <fieldset class="material">
		<input type="text" autocomplete="off"  name="full_name" onChange={handleChange} required />
        <hr/>
		<label>Full Name</label>
      </fieldset>
      <fieldset class="material">
		<input type="text" autocomplete="off"  name="title" onChange={handleChange} required />
        <hr/>
		<label>Title</label>
      </fieldset>
      <fieldset class="material">
		<input type="text" autocomplete="off"  name="organization" onChange={handleChange} required />
        <hr/>
		<label>Organization</label>
      </fieldset>
       <fieldset class="material">
		<input type="text" autocomplete="off" name="email" onChange={handleChange} required />
        <hr/>
		<label>Email</label>
      </fieldset>
       <fieldset class="material">
		<input type="text" autocomplete="off" name="contact_number" onChange={handleChange} required />
        <hr/>
		<label>Contact Number</label>
      </fieldset>
      <p>
      <Recaptcha ref={recaptchaRef} sitekey={RECAPTCHA_KEY} />
      </p>
        <p>
          <button type="submit">Get in touch</button>
        </p>
        </form>
      </div>
    </Layout>
  )
}
