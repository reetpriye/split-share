import React from 'react'
import Spinner from '../assets/spinner.svg'
import './styles/Loader.css'

const Loader = () => {
  return <img className='loader' alt='loader' src={Spinner} />
}

export default Loader
