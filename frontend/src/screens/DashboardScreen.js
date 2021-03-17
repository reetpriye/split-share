import React, { useEffect, useState, Fragment } from 'react'
import Dash from '../components/Dash'
import Loader from '../components/Loader'
import LineChart from '../components/LineChart'
import ColumnChart from '../components/ColumnChart'

import TransactionList from '../components/TransactionList'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { getExpenseDetails } from '../actions/expenseActions'
import { createTransaction } from '../actions/transactionActions'

import './styles/Dashboard.css'

const DashboardScreen = ({ match, history }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [inputData, setInputData] = useState([])
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const currExpense = useSelector(state => state.currExpense)
  const transactionCreate = useSelector(state => state.transactionCreate)

  const { expenseData, loading } = currExpense
  const { success } = transactionCreate

  const inpHeight = 291

  const initiateStateWithLocalStorageValues = () => {
    if (localStorage.getItem('inputData')) {
      const inputDataLS = JSON.parse(localStorage.getItem('inputData'))
      setInputData(inputDataLS)
    } else {
      const inputDataLS = expenseData.membersData.map(m => ({
        id: m._id,
        name: m.name,
        amount: 0,
        isPayer: false,
        isExclude: false
      }))
      inputDataLS[0].isPayer = true
      if (expenseData.membersData.length > 1) {
        inputDataLS[1].isPayer = true
      }
      setInputData(inputDataLS)
      localStorage.setItem('inputData', JSON.stringify(inputDataLS))
    }
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
      dispatch(logout())
    }
    if (!expenseData || expenseData._id !== match.params.id) {
      dispatch(getExpenseDetails(match.params.id))
    }
    if (expenseData && expenseData.membersData.length === 0) {
      history.push(`/expense/${match.params.id}/members`)
    } else {
      expenseData && initiateStateWithLocalStorageValues()
    }
    // eslint-disable-next-line
  }, [match, history, dispatch, expenseData, success, userInfo])

  const payerHandler = idx => e => {
    let updatedPayers = [...inputData]
    updatedPayers[idx].isPayer = e.target.checked
    setInputData(updatedPayers)
    localStorage.setItem('inputData', JSON.stringify(updatedPayers))
  }

  const excludeHandler = idx => e => {
    let updatedExcludes = [...inputData]
    updatedExcludes[idx].isExclude = e.target.checked
    setInputData(updatedExcludes)
    localStorage.setItem('inputData', JSON.stringify(updatedExcludes))
  }

  const onChangeHandler = idx => e => {
    let updatedPayers = [...inputData]
    updatedPayers[idx].amount = e.target.value
    setInputData(updatedPayers)
  }

  const onSubmitHandler = () => {
    const transaction = {
      description,
      expense: match.params.id,
      payers: [],
      excludes: []
    }
    inputData.forEach(m => {
      if (m.isPayer) {
        transaction.payers.push({
          member: m.id,
          amount: Number(m.amount),
          name: m.name
        })
      }
      if (m.isExclude) {
        transaction.excludes.push({
          member: m.id,
          name: m.name
        })
      }
    })

    dispatch(createTransaction({ transaction }))
  }

  return (
    <div className='dashboard'>
      <div className='expense-details'>
        <h5 className='expense-name'>
          {expenseData && expenseData.expenseName}
        </h5>
        {expenseData && expenseData.expenseName === 'Not Saved' ? (
          <button className='expense-save-btn'>Save?</button>
        ) : null}
      </div>
      <div className='total-expense-container'>
        <h2 className='sub-heading'>Total Expense</h2>
        {loading ? (
          <Loader height={'135px'} />
        ) : (
          <h1>₹{expenseData && expenseData.totalExpense}</h1>
        )}
      </div>

      <div className='new-item-container'>
        <h2 className='sub-heading'>Add New Item</h2>
        {loading ? (
          <Loader height={`${inpHeight}px`} />
        ) : (
          <div className='new-item-inp-container'>
            <form onSubmit={onSubmitHandler}>
              <div className='desc-input-container'>
                <input
                  placeholder='Enter description'
                  className='desc-input'
                  type='text'
                  onChange={e => setDescription(e.target.value)}
                  required
                />
                <input type='submit' value='+ADD' className='add-btn btn' />
              </div>
              <div className='t-head'>
                <h5 id='members-name-label'>Name</h5>
                <h5 id='payers-label'>Payer</h5>
                <h5 id='excludes-label'>Exclude</h5>
                <h5 id='payers-input'>Amount</h5>
              </div>
              <div className='input-grid'>
                {inputData &&
                  inputData.map((member, idx) => (
                    <Fragment key={member.id}>
                      <h3 className='members-name'>{member.name}</h3>
                      <input
                        type='checkbox'
                        className='checkbox payers-checkbox'
                        checked={member.isPayer}
                        onChange={payerHandler(idx)}
                      />
                      <input
                        type='checkbox'
                        className='checkbox excludes-checkbox'
                        checked={member.isExclude}
                        onChange={excludeHandler(idx)}
                      />
                      <input
                        disabled={member.isPayer ? '' : 'disabled'}
                        className='payers-input'
                        type='number'
                        onChange={onChangeHandler(idx)}
                        required
                      />
                    </Fragment>
                  ))}
              </div>
            </form>
          </div>
        )}
      </div>

      <div className='members-share-container'>
        <i
          onClick={() => setIsInfoOpen(!isInfoOpen)}
          className={isInfoOpen ? 'fas fa-times' : 'fas fa-info'}
        ></i>
        {isInfoOpen && (
          <h5 className='info'>
            Minus signifies that member needs to pay that much amount and plus
            signifies that member will recieve that much amount. Overall the
            summation will always be zero.
          </h5>
        )}
        <h2 className='sub-heading'>Member's Share</h2>
        {loading ? (
          <Loader />
        ) : (
          expenseData &&
          expenseData.membersData.map(member => (
            <Fragment key={member._id}>
              <div className='member-share'>
                <h4>{member.name}</h4>
                <h5 className='member-share-amount'>
                  {member.amount.toFixed(2)}
                </h5>
              </div>
              <Dash />
            </Fragment>
          ))
        )}
      </div>

      <TransactionList expenseId={match.params.id} />
      <LineChart />
      <ColumnChart />
    </div>
  )
}

export default DashboardScreen
