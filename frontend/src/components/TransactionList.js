import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Transaction from './Transaction'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listLastTransactions } from '../actions/transactionActions'

import './styles/TransactionList.css'

const TransactionList = ({ expenseId }) => {
  const dispatch = useDispatch()

  const expenseLastTransactions = useSelector(
    state => state.expenseLastTransactions
  )
  const { currExpenseId } = useSelector(state => state.currExpense)
  const { loading, transactions } = expenseLastTransactions

  useEffect(() => {
    dispatch(listLastTransactions(expenseId))
  }, [dispatch, expenseId])

  return (
    <div className='transaction-list-container'>
      <h2 className='sub-heading'>Last 5 Transactions</h2>
      {loading ? (
        <Loader height={'247.42px'} />
      ) : (
        transactions &&
        transactions.map(transaction => (
          <Transaction key={transaction._id} transaction={transaction} />
        ))
      )}
      <Link
        to={`/transactions/${currExpenseId}`}
        style={{ textAlign: 'right', marginTop: '1rem' }}
      >
        Show all
      </Link>
    </div>
  )
}

export default TransactionList
