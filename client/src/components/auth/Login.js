import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'
import { Link } from 'react-router-dom'

import './styles/LoginRegister.css'

const Register = props => {
  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)

  const { login, isAuthenticated, error, clearErrors } = authContext
  const { setAlert } = alertContext

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger')
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const onChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })

  const onSubmit = e => {
    e.preventDefault()
    login({
      email,
      password
    })
  }
  const { email, password } = user
  return (
    <div className='form-container'>
      <h1 className='heading'>Login</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            placeholder='Enter your email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            placeholder='Enter your password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <input type='submit' value='Log In' className='btn-submit' />
      </form>
      <h4 className='already-text'>
        Don't have an account?{' '}
        <Link className='link' to='/register'>
          REGISTER
        </Link>
      </h4>
    </div>
  )
}

export default Register
