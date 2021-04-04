import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import bars from '../assets/bars.svg'
import close from '../assets/close.svg'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'

import './styles/Navbar.css'

const Navbar = ({ location }) => {
  const dispatch = useDispatch()

  const { userInfo } = useSelector(state => state.userLogin)
  const { currExpenseId } = useSelector(state => state.currExpense)

  const [isNavOpen, setIsNavOpen] = useState(false)

  const toggleNav = () => setIsNavOpen(!isNavOpen)

  useEffect(() => {
    window.addEventListener('scroll', () => setIsNavOpen(false))
  }, [])
  const closeMobileMenu = () => setIsNavOpen(false)
  return (
    <>
      <nav className='navbar'>
        <div className='branding'>
          <Link
            to='/'
            onClick={e => {
              location.pathname.split('/')[1] === 'expense'
                ? e.preventDefault()
                : setIsNavOpen(false)
            }}
          >
            <span>Split</span>
            <span>Share</span>
          </Link>
        </div>
        <div className='menu-icon' onClick={toggleNav}>
          {!isNavOpen ? (
            <img className='bars-icon' src={bars} alt='bars' />
          ) : (
            <img className='close-icon' src={close} alt='close' />
          )}
        </div>
        <ul className={isNavOpen ? 'nav-menu active' : 'nav-menu'}>
          {userInfo ? (
            <>
              <li className='nav-item'>
                <Link
                  to={`/expense/${currExpenseId}`}
                  className='nav-links'
                  onClick={e =>
                    currExpenseId ? closeMobileMenu() : e.preventDefault()
                  }
                >
                  Dashboard
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/expenses'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Expenses
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to={`/analytics/${currExpenseId}`}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Analytics
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to={`/transactions/${currExpenseId}`}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Transactions
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/about'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to={`/howtouse`}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Tutorial
                </Link>
              </li>
              <li
                className='nav-item'
                onClick={() => {
                  closeMobileMenu()
                  setTimeout(() => {
                    dispatch(logout())
                  }, 200)
                }}
              >
                <button className='btn btn-secondary'>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className='nav-item'>
                <Link to={`/`} className='nav-links' onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/about'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to={`/howtouse`}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Tutorial
                </Link>
              </li>

              <li className='nav-item' onClick={closeMobileMenu}>
                <Link
                  style={{ color: 'var(--secondary-color)' }}
                  to='/login'
                  className='nav-links'
                >
                  LOGIN
                </Link>
              </li>
              <li className='nav-item' onClick={closeMobileMenu}>
                <Link
                  style={{ color: 'var(--secondary-color)' }}
                  to='/register'
                  className='nav-links'
                >
                  REGISTER
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
