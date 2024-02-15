import React from 'react'
import Layout from "./../components/Layout/Layout";
import "./about.css"

function Whoarewe() {
  return (
    <Layout>
      <div>
        <hr style={{ width: '80%' }} />
        <img src="https://static.wixstatic.com/media/c1ec53_5a93a877a8f74a4082fd11d24876d14f~mv2.jpg/v1/fill/w_2168,h_1215,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/FRAME%20CARVING%20F%20S2_MP4_snapshot_01_11_%5B2.jpg" alt="" style={{ width: '100%', marginBottom: '-37px' }} />

        <div id="bd" style={{ width: '100%', height: '700px', background: 'black', marginBottom: '-23px' }}>
          <h1 id="waw3" style={{ fontFamily: 'arial', paddingTop: '15px', fontSize: '50px' }}>Carving Since 1995</h1>
          <p id="waw3" style={{ fontSize: '25px', fontFamily: 'arial', fontWeight: 200 }}>
            Every people in our community would like to give a worthy and good-looking gift <br />
            to their loved ones at an affordable price.
          </p>
          <br />
          <p id="waw3" style={{ fontSize: '25px', fontFamily: 'arial', fontWeight: 200 }}>
            So, in 1995, we started carving Indian Natural Rosewood to make wall clocks<br />
            made with 100% natural rosewood, which is a perfect compliment from you<br />
            that could be remembered until it's on the wall.
          </p>
          <br />
          <h1 id="waw3" style={{ fontFamily: 'arial', paddingTop: '15px', fontSize: '50px' }}>The aim?</h1>
          <p id="waw3" style={{ fontSize: '25px', fontFamily: 'arial', fontWeight: 200 }}>
            To give everyone an opportunity to experience the beauty of Indian Natural Rosewood.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Whoarewe