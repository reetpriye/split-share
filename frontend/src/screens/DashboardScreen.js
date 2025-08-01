import { useEffect, useState, Fragment } from 'react'
import { Spring, config } from 'react-spring/renderprops'
import CurrExpense from '../components/CurrExpense'
import Dash from '../components/Dash'
import Message from '../components/Message'
import Loader from '../components/Loader'
import AreaChart from '../components/AreaChart'
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
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate
  } = transactionCreate

  const inpHeight = 291

  useEffect(() => {
    if (!userInfo) {
      dispatch(logout())
    } else {
      if (successCreate) {
        dispatch(getExpenseDetails(match.params.id))
      }
    }
    // eslint-disable-next-line
  }, [match.params.id, history, dispatch, successCreate, userInfo])

  useEffect(() => {
    const initiateStateWithLocalStorageValues = () => {
      const inputDataLS = JSON.parse(localStorage.getItem('inputData'))
      if (
        inputDataLS &&
        inputDataLS[inputDataLS.length - 1].id ===
          expenseData.membersData[expenseData.membersData.length - 1]._id &&
        inputDataLS.length === expenseData.membersData.length
      ) {
        setInputData(inputDataLS)
      } else {
        localStorage.removeItem('inputData')
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

    if (expenseData && expenseData.membersData.length === 0) {
      history.push(`/expenses/${match.params.id}/members`)
    } else {
      expenseData && initiateStateWithLocalStorageValues()
    }
  }, [expenseData, history, match.params.id])

  const onChangeHandler = idx => e => {
    let updatedPayers = [...inputData]
    updatedPayers[idx].amount = e.target.value
    setInputData(updatedPayers)
  }

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

  const onSubmitHandler = e => {
    e.preventDefault()
    const transaction = {
      description,
      expense: match.params.id,
      payers: [],
      excludes: [],
      consumersNotPayer: []
    }
    inputData.forEach(m => {
      if (m.isPayer && Number(m.amount) !== 0) {
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
      if (!m.isExclude && !m.isPayer) {
        transaction.consumersNotPayer.push(m.id)
      }
    })

    dispatch(createTransaction({ transaction }))
  }

  return (
    <div className='dashboard'>
      <div className='expense-details'>
        {errorCreate ? (
          <Message variant='danger'>{errorCreate}</Message>
        ) : expenseData && expenseData.expenseName ? (
          <CurrExpense
            trip={true}
            text='Back to members'
            link={`/expenses/${match.params.id}/members`}
          />
        ) : (
          <div id='expense-details-placeholder-div' />
        )}
      </div>

      <Spring
        from={{ transform: 'scale(0.9)' }}
        to={{ transform: 'scale(1)' }}
        config={config.wobbly}
      >
        {props => (
          <section style={props} className='card total-expense-container'>
            <h2 className='sub-heading'>Total Expense</h2>
            {loading || loadingCreate ? (
              <Loader height={'135px'} />
            ) : (
              expenseData && (
                <Spring
                  from={{ number: 0 }}
                  to={{ number: expenseData.totalExpense }}
                  config={config.default}
                >
                  {props => <h1>{`₹${props.number.toFixed(0)}`}</h1>}
                </Spring>
              )
            )}
          </section>
        )}
      </Spring>

      <Spring
        from={{ transform: 'scale(0.9)' }}
        to={{ transform: 'scale(1)' }}
        config={config.wobbly}
      >
        {props => (
          <section style={props} className='card new-item-container'>
            <h2 className='sub-heading'>Add New Item</h2>
            {loading || loadingCreate ? (
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
                    <input
                      type='submit'
                      value='+ADD'
                      className='btn btn-primary'
                    />
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
          </section>
        )}
      </Spring>

      <Spring
        from={{ transform: 'scale(0.9)' }}
        to={{ transform: 'scale(1)' }}
        config={config.wobbly}
      >
        {props => (
          <section style={props} className='card members-share-container'>
            <i
              onClick={() => setIsInfoOpen(!isInfoOpen)}
              className={isInfoOpen ? 'fas fa-times' : 'fas fa-info'}
            ></i>
            {isInfoOpen && (
              <h5 className='info'>
                Minus signifies that member needs to pay that much amount and
                plus signifies that member will recieve that much amount.
                Overall the summation will always be zero.
              </h5>
            )}
            <h2 className='sub-heading'>Member's Share</h2>
            {loading || loadingCreate ? (
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
          </section>
        )}
      </Spring>

      <TransactionList
        expenseId={match.params.id}
        successCreate={successCreate}
      />
      <ColumnChart />
      <AreaChart expenseId={match.params.id} successCreate={successCreate} />
    </div>
  )
}

export default DashboardScreen
