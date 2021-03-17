import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import bars from '../assets/bars.svg'
import close from '../assets/close.svg'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'

import './styles/Navbar.css'

const Navbar = () => {
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
            onClick={() => {
              setIsNavOpen(false)
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
                  onClick={closeMobileMenu}
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
                  to='/analytics'
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
              <li
                className='nav-item'
                onClick={() => {
                  closeMobileMenu()
                  setTimeout(() => {
                    dispatch(logout())
                  }, 200)
                }}
              >
                <button className='link-btn'>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className='nav-item'>
                <Link
                  to='/about'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </li>
              <div className='btn-container'>
                <li
                  className='nav-item'
                  onClick={() => {
                    closeMobileMenu()
                  }}
                >
                  <Link to='/login' className='nav-links'>
                    <button className='link-btn'>Login</button>
                  </Link>
                </li>
                <li
                  className='nav-item'
                  onClick={() => {
                    closeMobileMenu()
                  }}
                >
                  <Link to='/register' className='nav-links'>
                    <button className='link-btn'>Register</button>
                  </Link>
                </li>
              </div>
            </>
          )}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
