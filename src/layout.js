import React from 'react'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

import './css/typography.css'
import './css/styles.css'
import logo from './images/logo.png'


export default function Template({ children }) {  
  return (
    <>
      <Helmet
        title="Rona Design"
        meta={[{ name: 'description', content: 'Rona design studio' }, { name: 'keywords', content: 'design studio, web page creation' }]}
      />
      <div className="wrapper">
        <div className="grid">
          <div className="sidebar">
            <div className="logo">
            <Link to="/"><img src={logo} alt="Rona Design" height="50px" width="50px" /><span>Rona design</span></Link>
            </div>
            <div className="nav">
              <input type="checkbox" id="navbar-checkbox" className="navbar-checkbox" name="navbar-checkbox" />
              <nav className="menu">
                <label htmlFor="navbar-checkbox"  className="navbar-handle"></label>
                <ul>
                  <li> <Link to="/">- Home</Link></li>
                  <li> <Link to="/about-us/">- About us</Link></li>
                  <li> <Link to="/works/">- Works</Link></li>
                  <li> <Link to="/contact-us/">- Contact us</Link></li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="content">
            {children}
          </div>
        </div>


      </div>
      <div id="particle-canvas" ></div>
    </>
  )
}
