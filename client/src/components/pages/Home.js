import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';

const Home = () => {
  return (
    <div>
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
