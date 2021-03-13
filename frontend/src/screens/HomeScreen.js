import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Table from '../components/Table'

import './styles/Home.css'

const HomeScreen = () => {
  const currTrip = useSelector(state => state.currTrip)
  const { currTripId } = currTrip

  return (
    <>
      <div className='home'>
        <p className='under-construction'>
          Site is under construction
          <i className='fas fa-truck-pickup'></i>
        </p>
        <Link className='home-link' to={`trip/${currTripId}`}>
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
        <Table />
      </div>
    </>
  )
}

export default HomeScreen
