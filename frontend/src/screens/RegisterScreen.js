import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'

import './styles/LoginRegister.css'

const RegisterScreen = ({ history }) => {
  const { userInfo } = useSelector(state => state.userLogin)

  useEffect(() => {
    if (userInfo) {
      history.push('/expenses')
    }
  }, [userInfo, history])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
  const { loading, error } = userRegister

  const submitHandler = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      setTimeout(() => setMessage(''), 2200)
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <div className='form-container'>
      <h1 className='heading'>Register</h1>
      {message ? (
        <Message variant='danger'>{message}</Message>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div id='register-screen-message-placeholder-div' />
      )}

      <form onSubmit={submitHandler}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            placeholder='Enter your full name'
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            placeholder='Enter your email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            placeholder='Enter your password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            placeholder='Re-enter your password'
            type='password'
            name='password2'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            minLength='6'
          />
        </div>
        <button type='submit' value='RegisterScreen' className='btn-submit'>
          Sign Up
        </button>
      </form>
      <h4 className='already-text'>
        Already a user?{' '}
        <Link className='link' to='/login'>
          LOGIN
        </Link>
      </h4>
      {loading && <Loader />}
    </div>
  )
}

export default RegisterScreen
