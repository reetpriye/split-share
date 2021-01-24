import React from 'react';
import './styles/Navbar.css';
import bars from './assets/bars.svg';

const Navbar = () => {
  return (
    <nav>
      <div className='nav-text'>
        <span className='nav-text1'>Split</span>
        <span className='nav-text2'>Share</span>
      </div>
      <a href='#'>
        <img src={bars} />
      </a>
    </nav>
  );
};

export default Navbar;
