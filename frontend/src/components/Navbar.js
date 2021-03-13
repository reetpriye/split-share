import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import bars from '../assets/bars.svg'
import close from '../assets/close.svg'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'

import './styles/Navbar.css'

const Navbar = () => {
  const dispatch = useDispatch()

  const { userInfo } = useSelector(state => state.userLogin)

  const [isNavOpen, setIsNavOpen] = useState(false)

  const toggleNav = () => setIsNavOpen(!isNavOpen)

  const closeMobileMenu = () => setIsNavOpen(false)

  return (
    <>
      <nav className='navbar'>
        <div className='branding'>
          <Link to='/'>
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
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
              About
            </Link>
          </li>
          {userInfo ? (
            <>
              <li className='nav-item'>
                <Link
                  to='/trip'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/trips'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  My Trips
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
                  to='/transactions'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Transactions
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
              <div className='btn-container'>
                <li
                  className='nav-item'
                  onClick={() => {
                    closeMobileMenu()
                  }}
                >
                  <button className='link-btn'>Login</button>
                </li>

                <li
                  className='nav-item'
                  onClick={() => {
                    closeMobileMenu()
                  }}
                >
                  <button className='link-btn'>Register</button>
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
