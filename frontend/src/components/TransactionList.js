import React, { useEffect } from 'react'
import Transaction from './Transaction'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listTransactions } from '../actions/transactionActions'

import './styles/TransactionList.css'

const TransactionList = ({ tripId }) => {
  const dispatch = useDispatch()

  const tripTransactions = useSelector(state => state.tripTransactions)
  const { loading, transactions } = tripTransactions

  useEffect(() => {
    dispatch(listTransactions(tripId))
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
    </div>
  )
}

export default TransactionList
