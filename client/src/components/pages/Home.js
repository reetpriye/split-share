import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../assets/spinner.svg';
import AuthContext from '../../context/auth/authContext';

import './styles/Home.css';

const Home = () => {
  const authContext = useContext(AuthContext);

  const { loading, isAuthenticated, logout, user } = authContext;

  if (loading) {
    return <img className='spinner' src={Spinner} alt='' />;
  }
  return isAuthenticated ? (
    <div className='home'>
      <h1>Welcome {user && user.name}, You are logged in...</h1>
      <button className='btn-submit' onClick={logout}>
        Logout
      </button>
      <Link className='home-link' to='/about'>
        About
      </Link>
    </div>
  ) : (
    <div className='home'>
      <p className='under-construction'>
        Site is under construction
        <i className='fas fa-truck-pickup'></i>
      </p>
      <Link className='home-link' to='/dashboard'>
        Dashboard
      </Link>
      <Link className='home-link' to='/trips'>
        Trips
      </Link>
      <Link className='home-link' to='/members'>
        Members
      </Link>
      <Link className='home-link' to='/about'>
        About
      </Link>
      <Link className='home-link' to='/login'>
        Login
      </Link>
      <Link className='home-link' to='/register'>
        Register
      </Link>
    </div>
  );
};

export default Home;
