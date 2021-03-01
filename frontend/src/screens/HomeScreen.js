import React from 'react'
import { Link } from 'react-router-dom'

import './styles/Home.css'

const HomeScreen = () => {
  return (
    <div className='home'>
      <p className='under-construction'>
        Site is under construction
        <i className='fas fa-truck-pickup'></i>
      </p>
      <Link className='home-link' to='/dashboard'>
        Dashboard
      </Link>
      <Link className='home-link' to='/trips'>
        Trips
      </Link>
      <Link className='home-link' to='/members'>
        Members
      </Link>
      <Link className='home-link' to='/about'>
        About
      </Link>
      <Link className='home-link' to='/login'>
        Login
      </Link>
      <Link className='home-link' to='/register'>
        Register
      </Link>
    </div>
  )
}

export default HomeScreen
