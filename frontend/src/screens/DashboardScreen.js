import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './styles/Dashboard.css'

const DashboardScreen = () => {
  const [users, setUsers] = useState(null)
  const [trip, setTrip] = useState(null)

  useEffect(() => {
    const fetchUsers = async (req, res) => {
      const usersData = await axios.get('/api/users')

      const { data } = usersData
      const tripData = data[0].trips[0]
      setUsers(data)
      setTrip(tripData)
    }

    fetchUsers()
  }, [])
  return (
    <div className='dashboard'>
      <div className='trip-details'>
        <h5 className='trip-name'>TRIP: {trip && trip.tripName}</h5>
        {trip && trip.tripName === 'Not Saved' ? (
          <button className='trip-save-btn'>Save?</button>
        ) : null}
      </div>
      <div className='total-expense-container'>
        <h3>Total Expense</h3>
        <h1>₹{trip && trip.totalExpense}</h1>
      </div>
      <div className='new-item-container'>
        <h3 className='sub-heading'>Add New Item</h3>
        <div className='new-item-inp-container'>
          <input type='number' />
          <button>+ADD</button>
        </div>

        <h3 className='new-item-type'>Payer</h3>
        <div className='new-item-payer'>
          {trip &&
            trip.membersData.map(member => (
              <div key={member._id} className='payer'>
                <input type='checkbox' />
                <h5>{member.name}</h5>
              </div>
            ))}
        </div>

        <h3 className='new-item-type'>Exclude</h3>
        <div className='new-item-exclude'>
          {trip &&
            trip.membersData.map(member => (
              <div key={member._id} className='exclude'>
                <input type='checkbox' />
                <h5>{member.name}</h5>
              </div>
            ))}
        </div>
      </div>

      <div className='members-share-container'>
        <h3 className='sub-heading'>Member's Share</h3>
        {trip &&
          trip.membersData.map(member => (
            <div key={member._id} className='member-share'>
              <h5>{member.name}</h5>
              <h5 className='member-share-amount'>{member.amount}</h5>
            </div>
          ))}
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
