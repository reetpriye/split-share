import React from 'react'
import { Link } from 'react-router-dom'

import './styles/Footer.css'

const Footer = () => {
  return (
    <footer>
      <h4>
        DESIGNED & DEVELOPED BY <Link to='/about'>REET</Link>
      </h4>
    </footer>
  )
}

export default Footer
