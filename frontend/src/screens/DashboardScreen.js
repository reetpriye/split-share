import React, { useEffect, useState } from 'react'
import Dash from '../components/Dash'
import Loader from '../components/Loader'
import Chart from '../components/Chart'
import Transaction from '../components/Transaction'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { getTripDetails } from '../actions/tripActions'
import { createTransaction } from '../actions/transactionActions'

import './styles/Dashboard.css'

const DashboardScreen = ({ match, history }) => {
  const [inputData, setInputData] = useState([])
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const currTrip = useSelector(state => state.currTrip)
  const transactionCreate = useSelector(state => state.transactionCreate)

  const { tripData, loading } = currTrip
  const { success, loading: loadingCreate } = transactionCreate

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
      dispatch(logout())
    }
    if (!tripData || tripData._id !== match.params.id) {
      dispatch(getTripDetails(match.params.id))
    }
    if (tripData && tripData.membersData.length === 0) {
      history.push(`/trip/${match.params.id}/members`)
    } else {
      tripData && initiateStateWithLocalStorageValues()
    }
  }, [match, history, dispatch, tripData, success])

  const initiateStateWithLocalStorageValues = () => {
    if (localStorage.getItem('inputData')) {
      const inputDataLS = JSON.parse(localStorage.getItem('inputData'))
      setInputData(inputDataLS)
    } else {
      const inputDataLS = tripData.membersData.map(m => ({
        id: m._id,
        name: m.name,
        amount: 0,
        isPayer: false,
        isExclude: false
      }))
      inputDataLS[0].isPayer = true
      if (tripData.membersData.length > 1) {
        inputDataLS[1].isPayer = true
      }
      setInputData(inputDataLS)
      localStorage.setItem('inputData', JSON.stringify(inputDataLS))
    }
  }

  const payerHandler = idx => e => {
    let updatedPayers = [...inputData]
    updatedPayers[idx].isPayer = e.target.checked
    setInputData(updatedPayers)
    localStorage.setItem('inputData', JSON.stringify(updatedPayers))
  }

  const excludeHandler = idx => e => {
    let updatedExcludes = [...inputData]
    updatedExcludes[idx].isExclude = e.target.checked
    setInputData(updatedExcludes)
    localStorage.setItem('inputData', JSON.stringify(updatedExcludes))
  }

  const onChangeHandler = idx => e => {
    let updatedPayers = [...inputData]
    updatedPayers[idx].amount = e.target.value
    setInputData(updatedPayers)
  }

  const onSubmitHandler = () => {
    const transaction = {
      description,
      trip: match.params.id,
      payers: [],
      excludes: []
    }
    inputData.forEach(m => {
      if (m.isPayer) {
        transaction.payers.push({
          member: m.id,
          amount: Number(m.amount),
          name: m.name
        })
      }
      if (m.isExclude) {
        transaction.excludes.push({
          member: m.id,
          name: m.name
        })
      }
    })

    dispatch(createTransaction({ transaction }))
  }

  return (
    <div className='dashboard'>
      <div className='trip-details'>
        <h5 className='trip-name'>TRIP: {tripData && tripData.tripName}</h5>
        {tripData && tripData.tripName === 'Not Saved' ? (
          <button className='trip-save-btn'>Save?</button>
        ) : null}
      </div>
      <div className='total-expense-container'>
        <h3 className='sub-heading'>Total Expense</h3>
        {loading ? <Loader /> : <h1>₹{tripData && tripData.totalExpense}</h1>}
      </div>

      <div className='new-item-container'>
        <h3 className='sub-heading'>Add New Item</h3>

        <div className='new-item-inp-container'>
          <form onSubmit={onSubmitHandler}>
            <input
              placeholder='Enter description'
              className='desc-input'
              type='text'
              onChange={e => setDescription(e.target.value)}
              required
            />

            <div className='input-grid'>
              <h5 id='members-name-label'>Name</h5>
              <h5>Payer</h5>
              <h5 id='excludes-label'>Exclude</h5>
              <h5>Amount</h5>
              {inputData &&
                inputData.map((member, idx) => (
                  <>
                    <h3 className='members-name'>{member.name}</h3>
                    <input
                      type='checkbox'
                      className='checkbox payers-checkbox'
                      value={member.id}
                      checked={member.isPayer}
                      onChange={payerHandler(idx)}
                    />
                    <input
                      type='checkbox'
                      className='checkbox excludes-checkbox'
                      value={member.id}
                      checked={member.isExclude}
                      onChange={excludeHandler(idx)}
                    />
                    <input
                      disabled={member.isPayer ? '' : 'disabled'}
                      className='payers-input'
                      type='number'
                      onChange={onChangeHandler(idx)}
                      required
                    />
                  </>
                ))}
            </div>
            <input type='submit' value='+ADD' className='add-btn' />
          </form>
        </div>
      </div>

      <div className='members-share-container'>
        <h3 className='sub-heading'>Member's Share</h3>
        {loading ? (
          <Loader />
        ) : (
          tripData &&
          tripData.membersData.map(member => (
            <>
              <div key={member._id} className='member-share'>
                <h5>{member.name}</h5>
                <h5 className='member-share-amount'>
                  {member.amount.toFixed(2)}
                </h5>
              </div>
              <Dash />
            </>
          ))
        )}
      </div>
      <Transaction tripId={match.params.id} />
      <Chart />
    </div>
  )
}

export default DashboardScreen
