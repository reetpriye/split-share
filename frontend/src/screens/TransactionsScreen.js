import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import generatePDF from '../services/reportGenerator'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getExpenseDetails } from '../actions/expenseActions'
import {
  listAllTransactions,
  deleteTransaction
} from '../actions/transactionActions'

import './styles/Transactions.css'

const TransactionsScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const expenseAllTransactions = useSelector(
    state => state.expenseAllTransactions
  )
  const currExpense = useSelector(state => state.currExpense)
  const transactionDelete = useSelector(state => state.transactionDelete)

  const { expenseData, currExpenseId } = currExpense
  const { loading, transactions } = expenseAllTransactions
  const {
    loading: loadingDelete,
    success: successDelete,
    message: messageDelete,
    error: errorDelete
  } = transactionDelete

  useEffect(() => {
    if (!currExpenseId) {
      history.push('/expenses')
    } else {
      dispatch(listAllTransactions(match.params.id))
      dispatch(getExpenseDetails(match.params.id))
    }
  }, [dispatch, match.params.id, successDelete])

  return (
    <div className='all-transactions-container'>
      {loading || loadingDelete ? (
        <Loader />
      ) : (
        <>
          {messageDelete && <h6>{messageDelete}</h6>}
          {errorDelete && <h6>{errorDelete}</h6>}
          <div className='transactions-link-container'>
            <button>
              <Link to={match.url + '/trash'}>
                Check Trash <i className='fas fa-trash'></i>
              </Link>
            </button>
            <button onClick={() => generatePDF(transactions, expenseData)}>
              Generate Report <i className='fas fa-file-pdf'></i>
            </button>
          </div>
          {transactions &&
            transactions.map(t => (
              <div key={t._id} className='transaction-card'>
                <h5>{t.description}</h5>
                <h5>{moment(t.createdAt).format('MMM Do YY')}</h5>
                <div className='payers-container'>
                  <div className='payers-label'>
                    <h6>PAYERS</h6>
                  </div>
                  <div className='payers'>
                    {t.payers.map(p => (
                      <div key={p._id} className='payer'>
                        <h5>{p.name}</h5>
                        <h5>{p.amount}</h5>
                      </div>
                    ))}
                  </div>
                </div>
                <h5 id='total-amount'>{t.totalAmount}</h5>
                {t.excludes.length !== 0 ? (
                  <div className='excludes-container'>
                    <div className='excludes-label'>
                      <h6>EXCLUDES</h6>
                    </div>
                    <div className='excludes'>
                      {t.excludes.map(e => (
                        <h5 key={e._id}>{e.name} </h5>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div />
                )}

                <h3
                  style={{ color: '#f64034' }}
                  onClick={() => dispatch(deleteTransaction(t._id))}
                >
                  DELETE <i className='fas fa-trash'></i>
                </h3>
              </div>
            ))}
        </>
      )}
    </div>
  )
}

export default TransactionsScreen
