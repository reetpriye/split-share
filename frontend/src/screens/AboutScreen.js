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
            <h4>Software Developer</h4>
            <h2>Reet Priye</h2>
            <h3>Kolkata, India</h3>
          </div>
          <div className='description'>
            <p>
              Hello, I'm <strong>Reet Priye</strong>, a Full Stack Developer currently working at 
              <strong> Tata Consultancy Services</strong>. I have <strong>2 years of experience</strong> 
              building scalable, enterprise-grade web applications using technologies like 
              <strong> React, Java, Spring Boot</strong>, and DevOps tools including 
              <strong> Docker, Kubernetes</strong>, and CI/CD pipelines.
            </p>
            <p>
              I'm passionate about writing clean, maintainable code and solving complex problems—
              demonstrated by solving <strong>1000+ DSA problems</strong> on LeetCode and earning the 
              <strong> Knight Badge</strong>. My work currently supports a leading German multinational 
              bank, where I contribute to critical systems used by hundreds of business clients.
            </p>
            <p>
              I'm always looking to learn new technologies, collaborate on impactful projects, and create 
              solutions that address real-world problems. If you'd like to connect, discuss opportunities, 
              or share feedback, feel free to reach out at 
              <strong> reetpriye@gmail.com</strong>.
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
