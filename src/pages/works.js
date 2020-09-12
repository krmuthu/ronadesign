import React, { useEffect } from 'react'
import Layout from '../layout'

import '../css/works.css'
import img1 from '../images/img_iot.jpg'
import img3 from '../images/img_quar.jpg'
import img4 from '../images/img_got.jpg'

export default function Index() {
  
  let next = 0;
  let curPage = 0;
  let pages = ['one', 'two', 'three', 'four'];
  let isScrolling = false;

  const onScroll = (e) => {
    if (isScrolling) return;

    next += e.deltaY;
    console.log(next)
    if (next > 1) {
      if (curPage < 3) curPage++;
      isScrolling = true;
      next = 0;
      goPage();
    } if (next < -1) {
      if (curPage > 0) curPage--;
      isScrolling = true;
      next = 0;
      goPage();
    }

  }
  const goPage = () => {
    console.log(curPage);
    //document.querySelectorAll('.active').forEach((e) => {console.log(e)})
    const aciveScreen = document.querySelector('.active');
    if(aciveScreen) {
      aciveScreen.classList.remove('active');
    }
    const newScreen = document.querySelector('.' + pages[curPage]);
    if(aciveScreen) {
      newScreen.classList.add('active');
    }
    
    setTimeout(() => { isScrolling = false; }, 2000);

  }
  useEffect(() => {
    const width = window.innerWidth || document.body.clientWidth;
    if(width < 901){
      window.addEventListener('wheel', onScroll, false);
    }

    return () => {
      if(width < 901){
        window.removeEventListener('wheel', onScroll, false);
      }
    }
  })
  return (
    <Layout>
      <div className="works">

        <div className="screen one active">
          <h1><span>The A-Team For</span><span>Your Every Design Need</span></h1>
          <p>The digital conversion that will skyrocket your brand.</p>
        </div>
        <div className={`screen two `}>
          <h1>IoT Mobile App - LG</h1>
          <p>A project that focuses on modernizing LG’s IoT App for Air Conditioners. A focus on the dashboard and the most important information in every screen.</p>
          <div className="img-holder"><img alt="IoT Mobile App - LG" src={img1} /></div>
        </div>
        <div className={`screen three`}>
          <h1>Quarantine</h1>
          <p>We aim to help you speak to your unique audience. So no matter the style - we help you translate your vision into a website.</p>
          <div className="img-holder"><img alt="Quarantine" src={img3} /></div>
        </div>
        <div className={`screen four`}>
          <h1>GOT</h1>
          <p>We also provide design consultations of your digital products and website which you may use to develop your presence internally.</p>
          <div className="img-holder"><img alt="GOT" src={img4} /></div>
        </div>
      </div>
    </Layout>
  )
}


