import React, { useEffect } from 'react'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'

import './styles/Home.css'

const HomeScreen = ({ history }) => {
  const currTrip = useSelector(state => state.currTrip)
  const { currTripId } = currTrip

  useEffect(() => {
    if (currTripId) {
      history.push(`/trip/${currTripId}`)
    } else {
      history.push('/trips')
    }
  }, [currTripId, history])

  return (
    <div className='home-loader'>
      <Loader />
    </div>
  )
}

export default HomeScreen
