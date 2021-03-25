import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './styles/CurrExpense.css'

const CurrExpense = ({ trip = false }) => {
  const currExpense = useSelector(state => state.currExpense)

  const { expenseData } = currExpense

  return (
    <div className='curr-expense-container'>
      <Link to='/expenses'>
        <i className='fas fa-arrow-left'></i>Back to expenses
      </Link>
      <h5 id='curr-expense-name'>
        {trip && expenseData && expenseData.expenseName}
      </h5>
    </div>
  )
}

export default CurrExpense
