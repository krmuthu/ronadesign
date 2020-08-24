import React, {useEffect} from 'react'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

import './css/typography.css'
import './css/styles.css'

import logo from './images/logo.png'


export default function Template({ children }) {  
  return (
    <>
      <Helmet
        title="Rona design"
        meta={[{ name: 'description', content: 'Rona design studio' }, { name: 'keywords', content: 'design studio, web page creation' }]}
      />
      <div class="wrapper">
        <div class="grid">
          <div class="sidebar">
            <div class="logo">
            <Link to="/"><img src={logo} height="50px" width="50px" /><span>Rona design</span></Link>
            </div>
            <div class="nav">
              <input type="checkbox" id="navbar-checkbox" class="navbar-checkbox" />
              <nav class="menu">
                <label for="navbar-checkbox" class="navbar-handle"></label>
                <ul>
                  <li> <Link to="/">- Home</Link></li>
                  <li> <Link to="/about-us/">- About us</Link></li>
                  <li> <Link to="/works/">- Works</Link></li>
                  <li> <Link to="/contact-us/">- Contact us</Link></li>
                </ul>
              </nav>
            </div>
          </div>
          <div class="content">
            {children}
          </div>
        </div>


      </div>
      <div id="particle-canvas" ></div>
    </>
  )
}
