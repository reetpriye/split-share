import { useEffect, useState, Fragment } from 'react'
import { Spring, config } from 'react-spring/renderprops'
import { CSSTransition } from 'react-transition-group'
import Dash from '../components/Dash'
import NoData from '../components/NoData'
import Message from '../components/Message'
import Placeholder from '../components/Placeholder'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {
  listUserExpense,
  createExpense,
  deleteExpense
} from '../actions/expenseActions'

import './styles/Expense.css'

const ExpenseScreen = ({ history }) => {
  const [expenseName, setExpenseName] = useState('')

  const dispatch = useDispatch()
  const userExpenses = useSelector(state => state.userExpenses)
  const userLogin = useSelector(state => state.userLogin)
  const expenseDelete = useSelector(state => state.expenseDelete)
  const expenseCreate = useSelector(state => state.expenseCreate)
  const { userInfo } = userLogin
  const { expenses, loading } = userExpenses
  const {
    success: successCreate,
    loading: loadingCreate,
    message: messageCreate,
    error: errorCreate
  } = expenseCreate
  const {
    success: successDelete,
    loading: loadingDelete,
    message: messageDelete
  } = expenseDelete

  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    }

    if (successCreate || successDelete) {
      dispatch(listUserExpense())
    }
  }, [history, userInfo, dispatch, successCreate, successDelete])

  return (
    <div className='expense-main-container'>
      <h2 className='heading'>Expenses</h2>

      {errorCreate ? (
        <Message variant={'danger'}>{errorCreate}</Message>
      ) : (
        <Placeholder />
      )}

      <Spring
        from={{ transform: 'scale(0.9)' }}
        to={{ transform: 'scale(1)' }}
        config={config.wobbly}
      >
        {props => (
          <section style={props} className='card add-expense-container'>
            <h6>ADD NEW EXPENSE</h6>
            <form
              onSubmit={e => {
                e.preventDefault()
                dispatch(createExpense(expenseName))
                setExpenseName('')
              }}
            >
              <div id='add-expense-input-container'>
                <input
                  type='text'
                  required
                  value={expenseName}
                  onChange={e => setExpenseName(e.target.value)}
                />
                <input className='btn btn-primary' type='submit' value='+ADD' />
              </div>

              <h6 id='expense-examples'>
                e.g. Goa Trip, January Flat Expense, New Year Picnic Expense,
                etc
              </h6>

              {messageCreate && (
                <CSSTransition
                  in={true}
                  classNames={'add-expense-success-message-'}
                  timeout={{ enter: 1000, exit: 1000 }}
                  appear={true}
                >
                  <h6 id='add-expense-success-message'>{messageCreate}</h6>
                </CSSTransition>
              )}

              {messageDelete && (
                <CSSTransition
                  in={true}
                  classNames={'delete-expense-success-message-'}
                  timeout={{ enter: 1000, exit: 1000 }}
                  appear={true}
                >
                  <h6 id='delete-expense-success-message'>{messageDelete}</h6>
                </CSSTransition>
              )}
            </form>
          </section>
        )}
      </Spring>

      <Spring
        from={{ transform: 'scale(0.9)' }}
        to={{ transform: 'scale(1)' }}
        config={config.wobbly}
      >
        {props => (
          <section style={props} className='card expense-list-container'>
            <h2 className='sub-heading'>
              EXPENSE LIST <i className='fas fa-money-check-alt'></i>
            </h2>
            {loading || loadingCreate || loadingDelete ? (
              <Loader height={'128px'} />
            ) : expenses && expenses.length !== 0 ? (
              expenses.map(expense => (
                <Fragment key={expense._id}>
                  <div className='expense'>
                    <Link
                      style={{ textTransform: 'capitalize' }}
                      to={`expense/${expense._id}`}
                    >
                      {expense.expenseName}
                    </Link>
                    <button className='man-btn'>
                      <Link
                        className='man-btn'
                        to={`expenses/${expense._id}/members`}
                      >
                        Manage
                        <br />
                        Members
                      </Link>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure?')) {
                          dispatch(deleteExpense(expense._id))
                        }
                      }}
                      className='del-btn'
                    >
                      <i className='fas fa-trash'></i>
                    </button>
                  </div>
                  <Dash />
                </Fragment>
              ))
            ) : (
              <NoData message={'Kindly add expense'} />
            )}
          </section>
        )}
      </Spring>
    </div>
  )
}

export default ExpenseScreen
