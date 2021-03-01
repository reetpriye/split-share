import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserTrips } from '../actions/tripActions'

import './styles/MyTrips.css'

const MyTripsScreen = ({ match }) => {
  const dispatch = useDispatch()
  const userTrips = useSelector(state => state.userTrips)
  const { userAllTrips } = userTrips

  useEffect(() => {
    dispatch(getUserTrips())
  }, [])

  return (
    <div className='trips'>
      <h2 className='heading'>My Trips</h2>
      <h3>
        HI, REET. KINDLY FIRST ADD <span>SOME TRIPS</span>
      </h3>
      <div className='trips-container'>
        <h2 className='sub-heading'>
          Trip List <i className='fas fa-user-circle'></i>
        </h2>
        <div className='add-trip-container'>
          <h6>ADD NEW TRIP</h6>
          <div className='input-container'>
            <input type='text' />
            <button>+ADD</button>
          </div>
          <h6 className='success-message'>Trip added successfully</h6>
        </div>
      </div>

      <div className='your-trips-container'>
        <h2>Your Trips</h2>
        {userAllTrips &&
          userAllTrips.map(trip => (
            <div key={trip._id} className='trip'>
              <Link to={trip._id}>{trip.tripName}</Link>
              <button className='man-btn'>
                Manage
                <br />
                Members
              </button>
              <button className='del-btn'>
                <i className='fas fa-trash'></i>
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default MyTripsScreen
