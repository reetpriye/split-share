import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getUserTrips, addTrip, deleteTrip } from '../actions/tripActions'

import './styles/MyTrips.css'

const MyTripsScreen = ({ history }) => {
  const [tripName, setTripName] = useState('')

  const dispatch = useDispatch()
  const userTrips = useSelector(state => state.userTrips)
  const userLogin = useSelector(state => state.userLogin)
  const { trips, loading } = userTrips
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    } else {
      dispatch(getUserTrips())
    }
  }, [history, userInfo, dispatch])

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
            <input
              type='text'
              value={tripName}
              onChange={e => setTripName(e.target.value)}
            />
            <button onClick={() => dispatch(addTrip(tripName))}>+ADD</button>
          </div>
          <h6 className='success-message'>Trip added successfully</h6>
        </div>
      </div>

      <div className='your-trips-container'>
        <h2>Your Trips</h2>
        {loading ? (
          <Loader />
        ) : (
          trips &&
          trips.map(trip => (
            <div key={trip._id} className='trip'>
              <Link to={`trip/${trip._id}`}>{trip.tripName}</Link>
              <button onClick={console.log('Next work')} className='man-btn'>
                Manage
                <br />
                Members
              </button>
              <button
                onClick={() => dispatch(deleteTrip(trip._id))}
                className='del-btn'
              >
                <i className='fas fa-trash'></i>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MyTripsScreen
