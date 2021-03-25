import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'
import Dash from '../components/Dash'
import expensesScreen from '../assets/expenses-screen.png'
import membersScreen from '../assets/members-screen.png'
import dashboardScreen from '../assets/dashboard-screen.png'
import transactionsScreen from '../assets/transactions-screen.png'
// import trip from '../assets/trip.svg'
import report from '../assets/report.jpg'
import destination from '../assets/destination.svg'
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

  return (
    <Spring
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
      config={{ duration: 1000, delay: 500 }}
    >
      {props => (
        <div style={props} className='home-container'>
          {/* <img src={trip} style={{ width: '80%' }} alt='trip' /> */}
          <section className='overview'>
            <img src={destination} style={{ width: '90%' }} alt='destination' />

            <div className='overview-summary'>
              <h3>Planning to go out for a trip?</h3>
              <h3>Having difficulties managing expenses?</h3>
              <h3>Not anymore, We've got you covered.</h3>
              <h3>No more hectic calculations.</h3>
              <h3>Just add expense & leave the maths to us.</h3>
            </div>
          </section>

          <button
            style={{ width: 'fit-content' }}
            className='btn btn-quaternary'
          >
            <Link to='/login' style={{ color: '#fff' }}>
              START USING <i className='fas fa-chevron-right'></i>
            </Link>
          </button>

          <div className='features'>
            <h1 className='heading'>FEATURES</h1>

            <section className='multi-use'>
              <div className='multi-use-summary'>
                <h3 style={{ color: 'var(--secondary-color)' }}>MULTI USE</h3>
                <p>
                  This web app can be used in a varities of scenarios such as
                  expense related to trip, monthly flat expenses, etc.
                </p>
              </div>
              <img
                src={expensesScreen}
                style={{ width: '40%' }}
                alt='destination'
              />
            </section>

            <Dash />

            <section className='manage-members'>
              <img
                src={membersScreen}
                style={{ width: '40%' }}
                alt='destination'
              />
              <div className='manage-members-summary'>
                <h3 style={{ color: 'var(--secondary-color)' }}>
                  MANAGE MEMBERS
                </h3>
                <p>
                  Manage members specific to a expense. If the member is
                  associated with any transaction. He/she can't be deleted or
                  updated.
                </p>
              </div>
            </section>

            <Dash />

            <section className='full-control'>
              <div className='full-control-summary'>
                <h3 style={{ color: 'var(--secondary-color)' }}>
                  FULL CONTROL
                </h3>
                <p>
                  Transaction can be added with full control(i.e.
                  single/multiple payers, multiple excluded members).
                </p>
              </div>
              <img
                src={dashboardScreen}
                style={{ width: '40%' }}
                alt='destination'
              />
            </section>

            <Dash />

            <section className='all-transactions'>
              <img
                src={transactionsScreen}
                style={{ width: '40%' }}
                alt='destination'
              />
              <div className='all-transactions-summary'>
                <h3 style={{ color: 'var(--secondary-color)' }}>
                  ALL TRANSACTIONS
                </h3>
                <p>
                  Check all the transactions at a place along with the ability
                  to trash them.
                </p>
              </div>
            </section>

            <Dash />

            <section className='generate-report'>
              <div className='generate-report-summary'>
                <h3 style={{ color: 'var(--secondary-color)' }}>
                  GENERATE REPORT
                </h3>
                <p>
                  User can generate pdf report which consists of all the
                  transactions and member's share information.
                </p>
              </div>
              <img src={report} style={{ width: '40%' }} alt='destination' />
            </section>

            <Dash />
          </div>
        </div>
      )}
    </Spring>
  )
}

export default HomeScreen
