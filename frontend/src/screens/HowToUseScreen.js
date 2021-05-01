import React from 'react'
import { Spring } from 'react-spring/renderprops'
import Demo01 from '../assets/demo-01.gif'
import Demo02 from '../assets/demo-02.gif'
import Demo03 from '../assets/demo-03.gif'

import './styles/HowToUse.css'

const HowToUseScreen = () => {
  return (
    <Spring
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
      config={{ duration: 1000, delay: 500 }}
    >
      {props => (
        <div style={props} id='how-to-use-container'>
          <h1 className='heading' style={{ marginBottom: '1rem' }}>
            How to use?
          </h1>

          <button
            style={({ width: 'fit-content' }, { alignSelf: 'center' })}
            className='btn btn-quaternary'
          >
            <a href='https://youtu.be/rgekoh5_OfM' style={{ color: '#fff' }}>
              Click here for video tutorial <i className='fab fa-youtube'></i>
            </a>
          </button>

          <h4>
            This gif will demostrate how to use the site. <br />
            In easy 1,2,3 steps <br />
            1. Add a expense <br />
            2. Add members <br />
            3. Start Managing expenses <br />
            Make sure you are logged in or register if you are a new user
          </h4>
          <div className='how-to-use'>
            <img src={Demo01} className='demo-img' alt='demo' />
            <p style={{ marginLeft: '1rem' }}>
              STEP 1 <br />
              Add a expense first. e.g. Goa Trip, April Flat Expense, Holi
              Picnic, etc.
            </p>
          </div>
          <div className='how-to-use' id='how-to-use-2'>
            <p style={{ marginRight: '1rem' }}>
              STEP 2 <br />
              Add members associated with that trip/expense
            </p>
            <img src={Demo02} className='demo-img' alt='demo' />
          </div>
          <div className='how-to-use'>
            <img src={Demo03} className='demo-img' alt='demo' />
            <p style={{ marginLeft: '1rem' }}>
              STEP 3 <br />
              Tick payer and exclude checkbox as per requirement, enter the
              amounts and click on +ADD button
            </p>
          </div>
        </div>
      )}
    </Spring>
  )
}

export default HowToUseScreen
