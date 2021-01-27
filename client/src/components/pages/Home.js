import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';

const Home = () => {
  return (
    <div className='home'>
      <p>Site is under construction</p>
      <Link className='home-link' to='/login'>
        Login
      </Link>
      <Link className='home-link' to='/register'>
        Register
      </Link>
      <Link className='home-link' to='/about'>
        About
      </Link>
    </div>
  );
};

export default Home;
