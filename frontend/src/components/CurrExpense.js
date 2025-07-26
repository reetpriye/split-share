import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './styles/CurrExpense.css'

const CurrExpense = ({ trip = false, text, link, trash = false, cnt }) => {
  const currExpense = useSelector(state => state.currExpense)

  const { expenseData } = currExpense

  return (
    <div className='curr-expense-container'>
      <Link to={link}>
        <i className='fas fa-arrow-left'></i>
        {text}
      </Link>
      {trip && (
        <h5 id='curr-expense-name'>
          {trip && expenseData && expenseData.expenseName}
        </h5>
      )}
      {trash && (
        <h5 id='curr-expense-name'>{trash && `Trash count: ${cnt}`}</h5>
      )}
    </div>
  )
}

export default CurrExpense
