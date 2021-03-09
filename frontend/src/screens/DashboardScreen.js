import React, { useEffect, useState } from 'react'
import Dash from '../components/Dash'
import Loader from '../components/Loader'
import Chart from '../components/Chart'
import Transaction from '../components/Transaction'
import { useDispatch, useSelector } from 'react-redux'
import { getTripDetails } from '../actions/tripActions'
import { createTransaction } from '../actions/transactionActions'

import './styles/Dashboard.css'

const DashboardScreen = ({ match, history }) => {
  const [payers, setPayers] = useState([])
  const [excludes, setExcludes] = useState([])
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const currTrip = useSelector(state => state.currTrip)
  const transactionCreate = useSelector(state => state.transactionCreate)

  const { tripData, loading } = currTrip
  const { success, loading: loadingCreate } = transactionCreate

  useEffect(() => {
    if (!tripData || tripData._id !== match.params.id) {
      dispatch(getTripDetails(match.params.id))
    } else {
      if (!localStorage.getItem('payers')) {
        console.log(tripData)
        if (tripData.membersData.length === 0) {
          history.push(`/trip/${match.params.id}/members`)
        } else {
          const payerDetails = tripData.membersData.map(m => ({
            id: m._id,
            name: m.name,
            amount: 0,
            isChecked: false
          }))
          payerDetails[0].isChecked = true
          if (tripData.membersData.length > 1) {
            payerDetails[1].isChecked = true
          }
          setPayers(payerDetails)
          localStorage.setItem('payers', JSON.stringify(payerDetails))
        }
      } else {
        const payerDetails = JSON.parse(localStorage.getItem('payers'))
        setPayers(payerDetails)
      }
      if (!localStorage.getItem('excludes')) {
        const excludeDetails = tripData.membersData.map(m => ({
          name: m.name,
          id: m._id,
          isChecked: false
        }))
        console.log(excludeDetails)
        setExcludes(excludeDetails)
        localStorage.setItem('excludes', JSON.stringify(excludeDetails))
      } else {
        const excludeDetails = JSON.parse(localStorage.getItem('excludes'))
        setExcludes(excludeDetails)
      }
    }
  }, [match, history, dispatch, tripData, success])

  const payerHandler = idx => e => {
    let updatedPayers = [...payers]
    updatedPayers[idx].isChecked = e.target.checked
    setPayers(updatedPayers)
    localStorage.setItem('payers', JSON.stringify(updatedPayers))
  }

  const excludeHandler = idx => e => {
    let updatedExcludes = [...excludes]
    updatedExcludes[idx].isChecked = e.target.checked
    setExcludes(updatedExcludes)
    localStorage.setItem('excludes', JSON.stringify(updatedExcludes))
  }

  const onChangeHandler = idx => e => {
    let updatedPayers = [...payers]
    updatedPayers[idx].amount = Number(e.target.value)
    setPayers(updatedPayers)
  }

  const onSubmitHandler = () => {
    const transaction = {
      description,
      trip: match.params.id,
      payers: [],
      excludes: []
    }
    payers.forEach(p => {
      if (p.isChecked) {
        transaction.payers.push({
          member: p.id,
          amount: p.amount,
          name: p.name
        })
      }
    })
    excludes.forEach(e => {
      if (e.isChecked) {
        transaction.excludes.push({
          member: e.id,
          name: e.name
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
        <form onSubmit={onSubmitHandler}>
          <input
            placeholder='Enter description'
            className='desc-input'
            type='text'
            onChange={e => setDescription(e.target.value)}
            required
          />
          <div className='new-item-inp-container'>
            {payers &&
              payers.map((member, idx) =>
                member.isChecked ? (
                  <div className='input-item' key={member.id}>
                    <p>{member.name}</p>
                    <input
                      type='number'
                      onChange={onChangeHandler(idx)}
                      required
                    />
                  </div>
                ) : null
              )}
            <input type='submit' value='+ADD' className='add-btn' />
          </div>
        </form>

        <h3 className='new-item-type'>Payer</h3>
        <div className='new-item-payer'>
          {loading || loadingCreate ? (
            <Loader />
          ) : (
            payers &&
            payers.map((member, idx) => (
              <div key={member.id} className='payer'>
                <input
                  type='checkbox'
                  className='checkbox'
                  value={member.id}
                  checked={member.isChecked}
                  onChange={payerHandler(idx)}
                />
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
            excludes &&
            excludes.map((member, idx) => (
              <div key={member.id} className='exclude'>
                <input
                  className='checkbox'
                  type='checkbox'
                  checked={member.isChecked}
                  value={member.id}
                  onChange={excludeHandler(idx)}
                />
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
