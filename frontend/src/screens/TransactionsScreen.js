import { useEffect } from 'react'
import { Spring, config } from 'react-spring/renderprops'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import CurrExpense from '../components/CurrExpense'
import NoData from '../components/NoData'
import moment from 'moment'
import generatePDF from '../services/reportGenerator'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { getExpenseDetails } from '../actions/expenseActions'
import {
  listAllTransactions,
  listTrashTransactions,
  deleteTransaction
} from '../actions/transactionActions'

import './styles/Transactions.css'

const TransactionsScreen = ({ match }) => {
  const dispatch = useDispatch()

  const expenseAllTransactions = useSelector(
    state => state.expenseAllTransactions
  )
  const expenseTrashTransactions = useSelector(
    state => state.expenseTrashTransactions
  )
  const userLogin = useSelector(state => state.userLogin)
  const currExpense = useSelector(state => state.currExpense)
  const transactionDelete = useSelector(state => state.transactionDelete)

  const { userInfo } = userLogin
  const { expenseData } = currExpense
  const { loading, transactions } = expenseAllTransactions
  const {
    loading: loadingTrash,
    transactions: transactionsTrash
  } = expenseTrashTransactions
  const {
    loading: loadingDelete,
    success: successDelete,
    message: messageDelete,
    error: errorDelete
  } = transactionDelete

  useEffect(() => {
    if (!userInfo) {
      dispatch(logout())
    }
    if (successDelete) {
      dispatch(listAllTransactions(match.params.id))
      dispatch(listTrashTransactions(match.params.id))
      dispatch(getExpenseDetails(match.params.id))
    }
  }, [dispatch, match.params.id, successDelete, userInfo])

  return (
    <div className='all-transactions-container'>
      <div className='transactions-link-container'>
        <button className='btn btn-secondary'>
          <Link style={{ color: '#fff' }} to={match.url + '/trash'}>
            Check Trash <i className='fas fa-trash'></i>
          </Link>
        </button>
        <button
          className='btn btn-secondary'
          onClick={() => generatePDF(transactions, expenseData)}
        >
          Generate Report <i className='fas fa-file-pdf'></i>
        </button>
      </div>

      {messageDelete ? (
        <Message variant='success'>{messageDelete}</Message>
      ) : errorDelete ? (
        <Message variant='danger'>{errorDelete}</Message>
      ) : (
        <div id='message-placeholder-div'>
          {transactionsTrash && (
            <CurrExpense
              trash={true}
              cnt={transactionsTrash && transactionsTrash.length}
              text='Back to dashboard'
              link={`/expense/${match.params.id}`}
            />
          )}
        </div>
      )}

      {loading || loadingDelete || loadingTrash ? (
        <Loader />
      ) : transactions && transactions.length !== 0 ? (
        transactions.map(t => (
          <Spring
            key={t._id}
            from={{ marginTop: -15 }}
            to={{ marginTop: 0 }}
            config={config.wobbly}
          >
            {props => (
              <div style={props} className='card transaction-card'>
                <h5>{t.description}</h5>
                <h5>{moment(t.createdAt).format('MMM Do kk:mm')}</h5>
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

                <button
                  className='btn btn-tertiary'
                  onClick={() => dispatch(deleteTransaction(t._id))}
                >
                  DELETE <i className='fas fa-trash'></i>
                </button>
                <p
                  style={{ margin: '0', marginLeft: '16px' }}
                >{`Members: ${t.numberOfMembers}`}</p>
                <div />
              </div>
            )}
          </Spring>
        ))
      ) : (
        <NoData message={'Kindly add some transactions'} />
      )}
    </div>
  )
}

export default TransactionsScreen
