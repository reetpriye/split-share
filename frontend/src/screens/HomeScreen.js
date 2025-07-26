import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'
import Dash from '../components/Dash'
import expensesScreen from '../assets/expenses-screen.png'
import membersScreen from '../assets/members-screen.png'
import membersShare from '../assets/members-share.jpg'
import dashboardScreen from '../assets/dashboard-screen.png'
import transactionsScreen from '../assets/transactions-screen.png'
import report from '../assets/report.jpg'
import analyticsScreen from '../assets/analytics-screen.png'
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
          <br />
          <br />

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

          <button
            style={{ width: 'fit-content' }}
            id='how-to-use-btn'
            className='btn btn-quaternary'
          >
            <Link to='/howtouse' style={{ color: '#fff' }}>
              How to use <i className='fas fa-question'></i>
            </Link>
          </button>

          <button
            style={{ width: 'fit-content' }}
            id='how-to-use-btn'
            className='btn btn-quaternary'
          >
            <a href='https://youtu.be/rgekoh5_OfM' style={{ color: '#fff' }}>
              Watch Tutorial <i className='fab fa-youtube'></i>
            </a>
          </button>

          <div className='features'>
            <h1 className='heading'>FEATURES</h1>

            <section id='multi-use'>
              <div id='multi-use-summary'>
                <h3 style={{ color: 'var(--secondary-color)' }}>MULTI USE</h3>
                <p>
                  This web app can be used in a variety of scenarios such as
                  expense related to the trip, monthly flat expenses, etc.
                </p>
              </div>
              <img
                src={expensesScreen}
                style={{ width: '40%' }}
                alt='destination'
              />
            </section>

            <Dash />

            <section id='manage-members'>
              <img
                src={membersScreen}
                style={{ width: '40%' }}
                alt='destination'
              />
              <div id='manage-members-summary'>
                <h3 style={{ color: 'var(--secondary-color)' }}>
                  MANAGE MEMBERS
                </h3>
                <p>
                  Member with associated transactions can't be deleted or
                  renamed. New members can be added in between.
                </p>
              </div>
            </section>

            <Dash />

            <section id='full-control'>
              <div id='full-control-summary'>
                <h3 style={{ color: 'var(--secondary-color)' }}>
                  FULL FLEXIBILITY
                </h3>
                <p>
                  Transactions can be added with full control(i.e.
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

            <section id='members-share'>
              <img
                src={membersShare}
                style={{ width: '40%' }}
                alt='destination'
              />
              <div id='members-share-summary'>
                <h3 style={{ color: 'var(--secondary-color)' }}>
                  REAL TIME MEMBER's SHARE
                </h3>
                <p>
                  Just after adding a transaction, member's share gets updated.
                  Negative values signifies that the member need to pay that
                  much amount and positive values signifies that member will
                  receive that much amount.
                </p>
              </div>
            </section>

            <Dash />

            <section id='all-transactions'>
              <div id='all-transactions-summary'>
                <h3 style={{ color: 'var(--secondary-color)' }}>
                  ALL TRANSACTIONS
                </h3>
                <p>
                  Check all the transactions at a place along with the ability
                  to trash them.
                </p>
              </div>
              <img
                src={transactionsScreen}
                style={{ width: '40%' }}
                alt='destination'
              />
            </section>

            <Dash />

            <section id='analytics-chart-report'>
              <img
                src={analyticsScreen}
                style={{ width: '40%' }}
                alt='destination'
              />
              <div id='analytics-chart-summary'>
                <h3 style={{ color: 'var(--secondary-color)' }}>ANALYTICS</h3>
                <p>
                  Charts to show member's share as well expense on previous
                  transactions.
                </p>
              </div>
            </section>

            <Dash />

            <section id='generate-report'>
              <div id='generate-report-summary'>
                <h3 style={{ color: 'var(--secondary-color)' }}>
                  GENERATE REPORT
                </h3>
                <p>
                  User can generate a pdf report which consists of all the
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
