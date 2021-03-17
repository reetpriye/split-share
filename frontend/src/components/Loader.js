import React from 'react'
import Spinner from '../assets/spinner.svg'
import './styles/Loader.css'

const Loader = ({ width, height = '5rem' }) => {
  const windowWidth = window.innerWidth
  // Default width for loader
  if (!width) width = windowWidth - 72

  return (
    <div style={{ width: width, height: height }} className='loader-div'>
      <img className='loader' alt='loader' src={Spinner} />
    </div>
  )
}

export default Loader
