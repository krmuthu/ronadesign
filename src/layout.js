import React, { useEffect } from 'react'
import { Link, navigate } from 'gatsby'
import { Helmet } from 'react-helmet'
import { globalHistory as history } from '@reach/router'

import './css/typography.css'
import './css/styles.css'
import logo from './images/logo.png'


export default function Template({path, children, currentPage }) {  
  const [menustate, setMenuState] = React.useState(false);
  const { location } = history;
  let next = 0;
  let curPage = 0;
  const pages = ['/', '/about-us/', '/works/', '/contact-us/'];
  let curPageNum = pages.findIndex((e)=>{return e.includes(location.pathname)})
  let isScrolling = true;
  let timer;
  let clientY;

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


  const goPage = () => {
    console.log(curPageNum)
    isScrolling = true;
    setTimeout(() => { isScrolling = false; }, 1000);
    navigate(pages[curPageNum]);
    return;
    //document.querySelectorAll('.active').forEach((e) => {console.log(e)})
    const aciveScreen = document.querySelector('.active');
    if(aciveScreen) {
      aciveScreen.classList.remove('active');
    }
    const newScreen = document.querySelector('.' + pages[curPage]);
    if(aciveScreen) {
      newScreen.classList.add('active');
    }
    
    

  }

  const onScroll = (e) => {
    return;
    console.log(e)
    if (isScrolling) return;
    next += e.deltaY;
    if (next > 2) {
      next = 0;
      if (curPageNum < 3){
        curPageNum++;
        goPage();
      }
      
    } if (next < -2) {
      next = 0;
      if (curPageNum > 0){
        curPageNum--;
        goPage();
      }
    }

  }

  const touchEndFn = (e) => {
    let deltaY;
    // Compute the change in X and Y coordinates. 
    // The first touch point in the changedTouches
    // list is the touch point that was just removed from the surface.
    
    deltaY = e.changedTouches[0].clientY - clientY;
    if(deltaY < 0) {
      if(window.innerHeight + window.scrollY >= document.body.scrollHeight){
        curPageNum++;
        goPage();
      }
    }
    // Process the data ... 
  }

  const touchStartFn = (e) => {
    // Cache the client X/Y coordinates
    clientY = e.touches[0].clientY;

  }

  useEffect(() => {
    //window.addEventListener('wheel', onScroll, false);
    document.addEventListener('touchstart', touchStartFn, false);
    
    document.addEventListener('touchend', touchEndFn, false);
    
    timer = setTimeout(() => { isScrolling = false; }, 1000);
    return () => {
        clearTimeout(timer);
        document.removeEventListener("touchmove", onScroll, {passive: false});
        //window.removeEventListener('wheel', onScroll, false);
    }
  })
  
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
            <Link to="/"><img src={logo} alt="Rona Design" height="50px" width="50px" /><span>Rona design</span></Link>
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
