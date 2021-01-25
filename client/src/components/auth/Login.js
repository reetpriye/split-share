import React from 'react';
import { Link } from 'react-router-dom';
import './styles/LoginRegister.css';

const Register = props => {
  const onChange = e => ([e.target.name] = e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    console.log('Form Submitted...');
  };

  return (
    <div className='form-container'>
      <h1 className='form-heading'>Login</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            placeholder='Enter your email'
            type='email'
            name='email'
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
  );
};

export default Register;
