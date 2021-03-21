import React, { useEffect, useState, Fragment } from 'react'
import { CSSTransition } from 'react-transition-group'
import Dash from '../components/Dash'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {
  listUserExpense,
  createExpense,
  deleteExpense,
  listExpenseMembers
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
    message: messageCreate
  } = expenseCreate
  const {
    success: successDelete,
    loading: loadingDelete,
    message: messageDelete
  } = expenseDelete

  useEffect(() => {
    dispatch(listUserExpense())
  }, [history, userInfo, dispatch, successCreate, successDelete])

  return (
    <div className='my-expenses-container'>
      <h2 className='heading'>Expenses</h2>
      {expenses && expenses.length === 0 && (
        <h4 id='my-expenses-message'>
          HI, {userInfo && userInfo.name.toUpperCase().split(' ')[0]}. KINDLY
          FIRST ADD <span>SOME EXPENSE</span>
        </h4>
      )}

      <section className='add-expense-container'>
        <h6>ADD NEW EXPENSE</h6>
        <form
          onSubmit={e => {
            e.preventDefault()
            dispatch(createExpense(expenseName))
          }}
        >
          <div id='add-expense-input-container'>
            <input
              type='text'
              required
              value={expenseName}
              onChange={e => setExpenseName(e.target.value)}
            />
            <input className='btn' type='submit' value='+ADD' />
          </div>

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

      <section className='expense-list-container'>
        <h2 className='sub-heading'>
          EXPENSE LIST <i className='fas fa-money-check-alt'></i>
        </h2>
        {loading || loadingCreate || loadingDelete ? (
          <Loader width={'311px'} height={'128px'} />
        ) : (
          expenses &&
          expenses.map(expense => (
            <Fragment key={expense._id}>
              <div className='expense'>
                <Link to={`expense/${expense._id}`}>{expense.expenseName}</Link>
                <button
                  onClick={() => dispatch(listExpenseMembers(expense._id))}
                  className='man-btn'
                >
                  <Link
                    className='man-btn'
                    to={`expense/${expense._id}/members`}
                  >
                    Manage
                    <br />
                    Members
                  </Link>
                </button>
                <button
                  onClick={() => dispatch(deleteExpense(expense._id))}
                  className='del-btn'
                >
                  <i className='fas fa-trash'></i>
                </button>
              </div>
              <Dash />
            </Fragment>
          ))
        )}
      </section>
    </div>
  )
}

export default ExpenseScreen
