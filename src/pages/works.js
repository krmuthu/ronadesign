import React from 'react' 
import Layout from '../layout'

import '../css/works.css'
import img1 from '../images/img_iot.jpg'

export default function Index() {
  return (
    <Layout>
       <div className="works">
        <div className="active">
          <h1>IoT Mobile App - LG</h1>
          <p>A project that focuses on modernizing LG’s IoT App for Air Conditioners. A focus on the dashboard and the most important information in every screen.</p>
          <img src={img1}  />
        </div>
      </div>
    </Layout>
  )
}
