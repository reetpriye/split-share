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
      <button>
        <img src={bars} alt='Navbar' />
      </button>
    </nav>
  );
};

export default Navbar;
