import React, { useEffect } from 'react'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getTripDetails } from '../actions/tripActions'

import './styles/Dashboard.css'

const DashboardScreen = ({ match }) => {
  const dispatch = useDispatch()
  const currTrip = useSelector(state => state.currTrip)
  const { tripData, loading } = currTrip

  useEffect(() => {
    const fetchTripDetails = async (req, res) => {
      dispatch(getTripDetails(match.params.id))
    }
    fetchTripDetails()
  }, [match, dispatch])
  return (
    <div className='dashboard'>
      <div className='trip-details'>
        <h5 className='trip-name'>TRIP: {tripData && tripData.tripName}</h5>
        {tripData && tripData.tripName === 'Not Saved' ? (
          <button className='trip-save-btn'>Save?</button>
        ) : null}
      </div>
      <div className='total-expense-container'>
        <h3>Total Expense</h3>
        {loading ? <Loader /> : <h1>₹{tripData && tripData.totalExpense}</h1>}
      </div>
      <div className='new-item-container'>
        <h3 className='sub-heading'>Add New Item</h3>
        <div className='new-item-inp-container'>
          <input type='number' />
          <button>+ADD</button>
        </div>

        <h3 className='new-item-type'>Payer</h3>
        <div className='new-item-payer'>
          {loading ? (
            <Loader />
          ) : (
            tripData &&
            tripData.membersData.map(member => (
              <div key={member._id} className='payer'>
                <input type='checkbox' />
                <h5>{member.name}</h5>
              </div>
            ))
          )}
        </div>

        <h3 className='new-item-type'>Exclude</h3>
        <div className='new-item-exclude'>
          {loading ? (
            <Loader />
          ) : (
            tripData &&
            tripData.membersData.map(member => (
              <div key={member._id} className='exclude'>
                <input type='checkbox' />
                <h5>{member.name}</h5>
              </div>
            ))
          )}
        </div>
      </div>

      <div className='members-share-container'>
        <h3 className='sub-heading'>Member's Share</h3>
        {loading ? (
          <Loader />
        ) : (
          tripData &&
          tripData.membersData.map(member => (
            <div key={member._id} className='member-share'>
              <h5>{member.name}</h5>
              <h5 className='member-share-amount'>{member.amount}</h5>
            </div>
          ))
        )}
      </div>

      <div className='pie-chart'>
        <h2>PIE CHART</h2>
      </div>
      <div className='line-chart'>
        <h2>LINE CHART</h2>
      </div>
    </div>
  )
}

export default DashboardScreen
