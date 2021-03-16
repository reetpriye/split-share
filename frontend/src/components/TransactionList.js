import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Transaction from './Transaction'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listLastTransactions } from '../actions/transactionActions'

import './styles/TransactionList.css'

const TransactionList = ({ tripId }) => {
  const dispatch = useDispatch()

  const tripLastTransactions = useSelector(state => state.tripLastTransactions)
  const { currTripId } = useSelector(state => state.currTrip)
  const { loading, transactions } = tripLastTransactions

  useEffect(() => {
    dispatch(listLastTransactions(tripId))
  }, [dispatch, tripId])

  return (
    <div className='transaction-list-container'>
      <h2 className='sub-heading'>Last 5 Transactions</h2>
      {loading ? (
        <Loader />
      ) : (
        transactions &&
        transactions.map(transaction => (
          <Transaction key={transaction._id} transaction={transaction} />
        ))
      )}
      <Link
        to={`/transactions/${currTripId}`}
        style={{ textAlign: 'right', marginTop: '1rem' }}
      >
        Show all
      </Link>
    </div>
  )
}

export default TransactionList
