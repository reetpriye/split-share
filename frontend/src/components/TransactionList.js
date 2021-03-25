import React, { useEffect } from 'react'
import NoData from '../components/NoData'
import { Spring, config } from 'react-spring/renderprops'
import { Link } from 'react-router-dom'
import Transaction from './Transaction'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listLastTransactions } from '../actions/transactionActions'

import './styles/TransactionList.css'

const TransactionList = ({ expenseId, successCreate }) => {
  const dispatch = useDispatch()

  const expenseLastTransactions = useSelector(
    state => state.expenseLastTransactions
  )
  const { currExpenseId } = useSelector(state => state.currExpense)
  const { loading, transactions } = expenseLastTransactions

  useEffect(() => {
    if (successCreate) {
      dispatch(listLastTransactions(expenseId))
    }
  }, [dispatch, expenseId, successCreate])

  return (
    <Spring
      from={{ opacity: 0, transform: 'scale(0.9)' }}
      to={{ opacity: 1, transform: 'scale(1)' }}
      leave={{ opacity: 0 }}
      config={config.wobbly}
    >
      {props => (
        <div style={props} className='card transaction-list-container'>
          <h2 className='sub-heading'>Last 5 Transactions</h2>
          {loading ? (
            <Loader height={'247.42px'} />
          ) : transactions && transactions.length === 0 ? (
            <NoData message={'Kindly add transactions'} />
          ) : (
            <>
              {transactions.map(transaction => (
                <Transaction key={transaction._id} transaction={transaction} />
              ))}
              <Link
                to={`/transactions/${currExpenseId}`}
                style={{ textAlign: 'right', marginTop: '1rem' }}
              >
                Show all
              </Link>
            </>
          )}
        </div>
      )}
    </Spring>
  )
}

export default TransactionList
