import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';
import bars from '../assets/bars.svg';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <nav>
      <div className='nav-text'>
        <Link to='/'>
          <span className='nav-text1'>Split</span>
          <span className='nav-text2'>Share</span>
        </Link>
      </div>
      <button>
        <img src={bars} alt='Navbar' />
      </button>
    </nav>
  );
};

export default Navbar;
