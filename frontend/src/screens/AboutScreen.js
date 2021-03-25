import React from 'react'
import { Spring, config } from 'react-spring/renderprops'
import profile from '../assets/profile.jpg'

import './styles/About.css'

const AboutScreen = () => {
  return (
    <Spring
      from={{ transform: 'scale(0.9)' }}
      to={{ transform: 'scale(1)' }}
      config={config.wobbly}
    >
      {props => (
        <div style={props}>
          <div className='card about-card'>
            <img src={profile} alt='Profile Pic' />
            <h4>Sophomore</h4>
            <h2>Reet Priye</h2>
            <h3>Kolkata, India</h3>
          </div>
          <div className='description'>
            <p>
              Hello, people of the Internet, I'm Reet Priye, currently pursuing
              a Bachelor of Technology(ECE) from Heritage Institute of
              Technology, Kolkata. I created this site keeping in mind all the
              needs that the user may require. This site is built using the MERN
              stack and with a bunch of other NPM packages such as JWT,
              BcryptJS, etc.
              <br />
              I developed it as an attempt to improve my programming, designing
              skills and most importantly to learn full-stack development.
              <br />I would love to create more web app in future which could
              solve some real-life problems.
              <br />
              If you have any feature suggestions or want to report any bug,
              kindly mail to <span>reetpriye@gmail.com</span>
              <br />
              I would love and try my best to fix that.
              <br />
            </p>
          </div>
          <div className='label'>
            <h4>VERSION: 1.0.0</h4>
            <a href='https://www.buymeacoffee.com/reetpriye'>
              Buy me a coffee <i className='fas fa-coffee'></i>{' '}
            </a>
          </div>
        </div>
      )}
    </Spring>
  )
}

export default AboutScreen
