import { useState, Fragment } from 'react'
import Dash from './Dash'

import './styles/Transaction.css'

const Transaction = ({ transaction }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { description, totalAmount, payers, excludes } = transaction

  return (
    <Fragment>
      <div className='transaction'>
        <div className='transaction-collapse'>
          <h4>{description}</h4>
          <h5 className='transaction-amount'>{totalAmount}</h5>
          <i
            onClick={() => setIsOpen(!isOpen)}
            className='fas fa-caret-square-down'
          ></i>
        </div>
        {isOpen && (
          <div className='dropdown'>
            <div className='dropdown-label'>
              <h5>₹</h5>
              <h5>Name</h5>
              <h5>Excludes</h5>
            </div>
            <div className='dropdown-items'>
              <div className='dropdown-payers-items'>
                {payers.map(p => (
                  <div key={p._id} className='dropdown-payer-item'>
                    <h5>{p.amount}</h5>
                    <h5>{p.name}</h5>
                  </div>
                ))}
              </div>
              <div className='dropdown-excludes-items'>
                {excludes.map(e => (
                  <h5 key={e._id}>{e.name}</h5>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Dash />
    </Fragment>
  )
}

export default Transaction
