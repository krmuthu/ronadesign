import React, { useEffect } from 'react'
import Layout from '../layout'

import '../css/works.css'
import img1 from '../images/img_iot.jpg'
import img3 from '../images/img_quarantine.jpg'
import img4 from '../images/img_got.jpg'
import arrow from '../images/down.png'

export default function Index() {

  let next = 0;
  let curPage = 0;
  let pages = ['one', 'two', 'three', 'four'];
  let isScrolling = false;
  let direction = '';

  const onScroll = (e) => {
    if (isScrolling) return;
    next += e.deltaY;
    if (next > 1) {
      if (curPage < 3) {
        curPage++;
        direction = 1;
        isScrolling = true;
        goPage();
      }
      next = 0;
    } if (next < -1) {
      if (curPage > 0) {
        curPage--;
        direction = -1;
        isScrolling = true;
        goPage();
      }
      next = 0;
    }

  }
  const onClick = (num) => {
    if (isScrolling) return;
    if (num > curPage) {
      direction = 1;
    } else {

      direction = -1;
    }
    curPage = num;
    isScrolling = true;
    goPage();

  }
  const goPage = () => {
    const curScreen = document.querySelector('.screen.active');
    curScreen.classList.remove('active');
    const dots = document.querySelector('.dots');
    const dotsLi = document.querySelectorAll('.dots li');
    const activeLi = document.querySelector('.dots li.active');
    if (activeLi) {
      activeLi.classList.remove('active');
    }
    if (dotsLi) {
      dotsLi[curPage - 1].classList.add('active');
    }
    if (dots && curPage > 0) {
      dots.classList.add('active');
    } else {
      dots.classList.remove('active');
    }

    if (direction > 0) {
      curScreen.classList.add('top');
    } else {
      curScreen.classList.add('bottom');
    }
    const current = pages[curPage];
    const screenNext = document.querySelector(`.screen.${current}`);
    //screenNext.classList.remove('top');
    //screenNext.classList.remove('top');
    setTimeout(() => {
      screenNext.classList.add('active');
      screenNext.classList.remove('top');
      screenNext.classList.remove('bottom');
    }, 700);

    setTimeout(() => { isScrolling = false; }, 2000);

  }
  useEffect(() => {
    const alreadyActive = document.querySelector('.active');
    if (!alreadyActive) {
      const screenOne = document.querySelector('.screen.one');
      screenOne.classList.add('active')
    }

    const width = window.innerWidth || document.body.clientWidth;
    if (width > 900) {
      window.addEventListener('wheel', onScroll, false);
    }
    return () => {
      if (width > 900) {
        window.removeEventListener('wheel', onScroll, false);
      }
    }
  })
  return (
    <Layout>
      <div className="works">
        <div className="screen one">
          <h1><span>The A-Team For</span><span>Your Every Design Need</span></h1>
          <p><span>The digital conversion that will skyrocket your brand.</span></p>
          <p className="scroll">
            <img src={arrow} /> scroll down
          </p>
        </div>
        <div className={`screen two `}>
          <h1><span>IoT Mobile App - LG</span></h1>
          <p><span>A project that focuses on modernizing LG’s IoT App for Air Conditioners.</span><span>A focus on the dashboard and the most important information in every screen.</span></p>
          <div className="img-holder"><img alt="IoT Mobile App - LG" src={img1} /></div>
        </div>
        <div className={`screen three`}>
          <h1><span>Quarantine</span></h1>
          <p><span>We aim to help you speak to your unique audience. So no matter the style</span><span>- we help you translate your vision into a website.</span></p>
          <div className="img-holder"><img alt="Quarantine" src={img3} /></div>
        </div>
        <div className={`screen four`}>
          <h1><span>GOT</span></h1>
          <p><span>We also provide design consultations of your digital products and website</span>
            <span>which you may use to develop your presence internally.</span></p>
          <div className="img-holder"><img alt="GOT" src={img4} /></div>
        </div>
        <div className="dots">
          <ul>
            <li onClick={() => { onClick(1) }}></li>
            <li onClick={() => { onClick(2) }}></li>
            <li onClick={() => { onClick(3) }}></li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}


