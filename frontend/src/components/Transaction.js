import React, { useEffect } from 'react'
import Dash from '../components/Dash'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listTransactions } from '../actions/transactionActions'

import './styles/Transaction.css'

const Transaction = ({ tripId }) => {
  const dispatch = useDispatch()

  const tripTransactions = useSelector(state => state.tripTransactions)
  const { loading, transactions } = tripTransactions

  useEffect(() => {
    dispatch(listTransactions(tripId))
  }, [dispatch, tripId])

  return (
    <div className='transaction-container'>
      <h3 className='sub-heading'>Last 5 Transactions</h3>
      {loading ? (
        <Loader />
      ) : (
        transactions &&
        transactions.map(t => (
          <>
            <div key={t._id} className='transaction'>
              <h5>{t.description}</h5>
              <h5 className='transaction-amount'>{t.totalAmount}</h5>
            </div>
            <Dash />
          </>
        ))
      )}
    </div>
  )
}

export default Transaction
