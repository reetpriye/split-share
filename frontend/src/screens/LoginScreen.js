import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'

import './styles/LoginRegister.css'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [history, userInfo])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div className='form-container'>
      <h1 className='heading'>Login</h1>
      {error && <Message variant='danger'>{error}</Message>}
      <form onSubmit={submitHandler}>
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
        <button type='submit' className='btn-submit'>
          Log In
        </button>
      </form>

      <h4 className='already-text'>
        Don't have an account?{' '}
        <Link className='link' to='/register'>
          REGISTER
        </Link>
      </h4>
      {loading && <Loader />}
    </div>
  )
}

export default LoginScreen
