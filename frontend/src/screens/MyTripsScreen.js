import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {
  listUserTrips,
  createTrip,
  deleteTrip,
  listTripMembers
} from '../actions/tripActions'

import './styles/MyTrips.css'

const MyTripsScreen = ({ history }) => {
  const [tripName, setTripName] = useState('')

  const dispatch = useDispatch()
  const userTrips = useSelector(state => state.userTrips)
  const userLogin = useSelector(state => state.userLogin)
  const tripDelete = useSelector(state => state.tripDelete)
  const tripCreate = useSelector(state => state.tripCreate)
  const { userInfo } = userLogin
  const { trips, loading } = userTrips
  const { success: successCreate, loading: loadingCreate } = tripCreate
  const { success: successDelete, loading: loadingDelete } = tripDelete

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listUserTrips())
    }
  }, [history, userInfo, dispatch, successCreate, successDelete])

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
            <button onClick={() => dispatch(createTrip(tripName))}>+ADD</button>
          </div>
          <h6 className='success-message'>Trip added successfully</h6>
        </div>
      </div>

      <div className='your-trips-container'>
        <h2>Your Trips</h2>
        {loading || loadingCreate || loadingDelete ? (
          <Loader />
        ) : (
          trips &&
          trips.map(trip => (
            <div key={trip._id} className='trip'>
              <Link to={`trip/${trip._id}`}>{trip.tripName}</Link>
              <button
                onClick={() => dispatch(listTripMembers(trip._id))}
                className='man-btn'
              >
                <Link className='man-btn' to={`trip/${trip._id}/members`}>
                  Manage
                  <br />
                  Members
                </Link>
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
