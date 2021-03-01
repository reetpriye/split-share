import React from 'react'

import './styles/Message.css'

const Message = ({ variant, children }) => {
  return (
    <div key={alert.id} className={`alert alert-${variant}`}>
      <p className='m-0'>
        <i className='fas fa-info-circle' /> {children}
      </p>
    </div>
  )
}

export default Message
