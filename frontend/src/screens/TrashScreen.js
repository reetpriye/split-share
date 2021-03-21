import React, { useEffect } from 'react'
import moment from 'moment'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listTrashTransactions } from '../actions/transactionActions'

import './styles/Trash.css'

const TrashScreen = ({ match }) => {
  const dispatch = useDispatch()

  const expenseTrashTransactions = useSelector(
    state => state.expenseTrashTransactions
  )

  const { loading, transactions } = expenseTrashTransactions

  useEffect(() => {
    dispatch(listTrashTransactions(match.params.id))
  }, [dispatch, match.params.id])

  return (
    <div className='all-transactions-container'>
      {loading ? (
        <Loader />
      ) : (
        <>
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
              </div>
            ))}
        </>
      )}
    </div>
  )
}

export default TrashScreen
