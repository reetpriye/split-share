import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Register.css';

const Register = props => {
  const onChange = e => ([e.target.name] = e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    console.log('Form Submitted...');
  };

  return (
    <div className='form-container'>
      <h1 className='form-heading'>Register </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            placeholder='Enter your full name'
            type='text'
            name='name'
            onChange={onChange}
            required
          />
        </div>
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
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            placeholder='Re-enter your password'
            type='password'
            name='password2'
            onChange={onChange}
            minLength='6'
          />
        </div>
        <input type='submit' value='Sign Up' className='btn-submit' />
      </form>
      <h4 className='already-text'>
        Already a user?{' '}
        <Link className='link' to='/login'>
          LOGIN
        </Link>
      </h4>
    </div>
  );
};

export default Register;
