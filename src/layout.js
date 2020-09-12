import React, { useEffect } from 'react'
import { Link, navigate } from 'gatsby'
import { Helmet } from 'react-helmet'

import './css/typography.css'
import './css/styles.css'
import logo from './images/rlogo.png'


export default function Template({path, children, currentPage }) {  
  const [menustate, setMenuState] = React.useState(false);
  

/*
  useEffect(() => {
    class Circle {
      constructor (element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
          colors: ['#ff0', '#f0f', '#0ff'],
          duration: 1,
          lightenMask: false,
          onClick: function () {
            return false
          }
        }, options)
        this.index = 0
        this.boundClickHandler = event => this.clickHandler(event);
        this.init()
      }
      
      init() {
        this.element.addEventListener('click', this.boundClickHandler)
        this.setElementBackgroundColor(this.options.colors[0])
      }
      
      clickHandler(event) {
        this.incrementIndex()
        const circle = document.createElement('div')
        this.options.lightenMask ? circle.classList.add('circle', 'circle--mask') : circle.classList.add('circle')
        circle.style.top = `${event.clientY}px`
        circle.style.left = `${event.clientX}px`
        circle.style.animationDuration = `${this.options.duration}s`
        circle.style.backgroundColor = this.options.colors[this.index]
        this.element.appendChild(circle)
        this.destroyThirdCircle()
        this.options.onClick(this.options.colors[this.index])
      }
      setElementBackgroundColor(color) {
        this.element.style.backgroundColor = color
      }
      incrementIndex() {
        this.index++
        
        if (this.index === this.options.colors.length) {
          this.index = 0
        }
      }
      destroyThirdCircle() {
        if (document.querySelectorAll('.circle').length === 3) {
          const firstCircle = document.querySelectorAll('.circle')[0]
          firstCircle.parentNode.removeChild(firstCircle)
        }
      }
      destroyAllCircles() {
        ;[].forEach.call(document.querySelectorAll('.circle'), circle => {
          circle.parentNode.removeChild(circle)
        })
      }
      destroy() {
        this.index = 0
        this.element.removeEventListener('click', this.boundClickHandler)
        this.destroyAllCircles()
      }
    }
    
    const circle = new Circle(document.querySelector('.js-circle'), {
      colors: ['#1576fb', '#fff', '#e17055', '#fab1a0', '#ffeaa7', '#fdcb6e'],
      onClick: function (currentColor) {
        console.log('New color : ' + currentColor)
      }
    })
    
    
  })*/ 
  
  const onChangeMenu = (e) => {
    setMenuState(!menustate);
  }
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
            <Link to="/"><div className="imgHolder"><img src={logo} alt="Rona Design"  /></div><span>Rona design</span></Link>
            </div>
            <div className="nav">
              <input type="checkbox"  checked={menustate} onChange={onChangeMenu}  id="navbar-checkbox" className="navbar-checkbox" name="navbar-checkbox" />
              <nav className="menu">
                <label htmlFor="navbar-checkbox"  className="navbar-handle"></label>
                <div onClick={onChangeMenu} className="mobileMenu">
                  <ul>
                    <li> <Link to="/">- Home</Link></li>
                    <li> <Link to="/about-us/">- About us</Link></li>
                    <li> <Link to="/works/">- Works</Link></li>
                    <li> <Link to="/contact-us/">- Contact us</Link></li>
                  </ul>
                </div>
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
