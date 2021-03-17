import React, { useEffect } from 'react'
import trip from '../assets/trip.svg'
import destination from '../assets/destination.svg'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'

import './styles/Home.css'

const HomeScreen = ({ history }) => {
  const currExpense = useSelector(state => state.currExpense)
  const { userInfo } = useSelector(state => state.userLogin)
  const { currExpenseId } = currExpense

  useEffect(() => {
    if (userInfo) {
      if (currExpenseId) {
        history.push(`/expense/${currExpenseId}`)
      } else {
        history.push('/expenses')
      }
    }
  }, [currExpenseId, userInfo, history])

  return userInfo ? (
    <Loader height={'90vh'} width={'100vw'} />
  ) : (
    <div className='home-loader'>
      <img src={trip} style={{ width: '250px', height: '250px' }} alt='trip' />

      <h3>Planning to go somewhere</h3>
      <h3>Having difficulties managing expenses?</h3>
      <h3>We've got you covered</h3>
      <h3>No more hectic calculations</h3>
      <h3>Just add expense</h3>
      <h3>And leave the rest to us</h3>
      <img
        src={destination}
        style={{ width: '250px', height: '250px' }}
        alt='destination'
      />
    </div>
  )
}

export default HomeScreen
