import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

import './styles/Home.css'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const currTrip = useSelector(state => state.currTrip)
  const { currTripId } = currTrip

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
      <Link className='home-link' to={`trip/${currTripId}/members`}>
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
      <button
        onClick={() => dispatch(logout())}
        className='home-link'
        id='logout-btn'
      >
        Logout
      </button>
    </div>
  )
}

export default HomeScreen
