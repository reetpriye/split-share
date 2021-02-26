import React from 'react';

import './styles/Trips.css';

const Trips = () => {
  return (
    <div className='trips'>
      <h2 className='heading'>My Trips</h2>
      <h3>
        HI, REET. KINDLY FIRST ADD <span>SOME TRIPS</span>
      </h3>
      <div className='trips-container'>
        <h2 className='sub-heading'>
          Trip List <i className='fas fa-user-circle'></i>
        </h2>
        <div className='add-trip-container'>
          <h6>ADD NEW TRIP</h6>
          <div className='input-container'>
            <input type='text' />
            <button>+ADD</button>
          </div>
          <h6 className='success-message'>Trip added successfully</h6>
        </div>
      </div>

      <div className='your-trips-container'>
        <h2>Your Trips</h2>
        <div className='trip'>
          <h3>Ooty Trip</h3>
          <button className='man-btn'>
            Manage
            <br />
            Members
          </button>
          <button className='del-btn'>
            <i className='fas fa-trash'></i>
          </button>
        </div>
        <div className='trip'>
          <h3>Goa Trip</h3>
          <button className='man-btn'>
            Manage
            <br />
            Members
          </button>
          <button className='del-btn'>
            <i className='fas fa-trash'></i>
          </button>
        </div>
        <div className='trip'>
          <h3>Gangtok Trip</h3>
          <button className='man-btn'>
            Manage
            <br />
            Members
          </button>
          <button className='del-btn'>
            <i className='fas fa-trash'></i>
          </button>
        </div>
        <div className='trip'>
          <h3>Darjeeling Trip</h3>
          <button className='man-btn'>
            Manage
            <br />
            Members
          </button>
          <button className='del-btn'>
            <i className='fas fa-trash'></i>
          </button>
        </div>
        <div className='trip'>
          <h3>Andaman Trip</h3>
          <button className='man-btn'>
            Manage
            <br />
            Members
          </button>
          <button className='del-btn'>
            <i className='fas fa-trash'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trips;
