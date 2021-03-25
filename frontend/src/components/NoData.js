import React from 'react'
import noData from '../assets/no-data.svg'

const NoData = ({ message }) => {
  return (
    <div className='no-members'>
      <img style={{ width: '80px' }} src={noData} alt='noData' />
      <h6>NO DATA TO SHOW</h6>
      <h6 style={{ textTransform: 'uppercase' }}>{message}</h6>
    </div>
  )
}

export default NoData
