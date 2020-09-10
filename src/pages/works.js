import React, { useEffect } from 'react' 
import Layout from '../layout'

import '../css/works.css'
import img1 from '../images/img_iot.jpg'
import img2 from '../images/img_sheme.jpg'

export default function Index() {
  const [nextCard, setNextCard] = React.useState('active')
  const [prevCard, setPrevCard] = React.useState('');
  let currentTimer;
  
  let lastScrollTop = 0;
  let next = 0;
  let scrollInit = 0;
  const onScroll = (e) => {
    next += e.deltaY;
    scrollInit = new Date();
    console.log(next)
  }
  useEffect(() =>{
    window.addEventListener('wheel', onScroll, false);
    currentTimer = setInterval(() => {
      if(nextCard === 'active') {
        setNextCard('in-active');
        setTimeout(() => {setPrevCard('active')},1000);
      }else {
        
        setTimeout(() => {setNextCard('active')},1000);
        setPrevCard('in-active');
      }
    }, 6000);
    return () => {
      clearInterval(currentTimer)
    }
  })
  return (
    <Layout>
       <div className="works">
        <div className={`cards ${nextCard}`}> 
          <h1>IoT Mobile App - LG</h1>
          <p>A project that focuses on modernizing LG’s IoT App for Air Conditioners. A focus on the dashboard and the most important information in every screen.</p>
          <div className="img-holder"><img src={img1}  /></div>
        </div>
        <div className={`cards ${prevCard}`}>
          <h1>Apps for Children - Shemetenga</h1>
          <p>Shemetenga needed a website that promotes its unique portfolio of apps aimed at educating and entertaining children. We converted voice into a colorful branding that spoke directly to their primary customer - children.
</p>
          <div className="img-holder"><img src={img2}  /></div>
        </div>

      </div>
    </Layout>
  )
}


