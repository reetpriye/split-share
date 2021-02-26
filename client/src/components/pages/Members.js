import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Members.css';

const Members = () => {
  return (
    <div className='members'>
      <h3 className='suggestions'>
        Kindly first <span>add members</span> in order to start managing
        expenses
      </h3>
      <div className='member-list-container'>
        <h2>
          Member List <i className='fas fa-user-circle'></i>
        </h2>
        <h6>ADD NEW MEMBER</h6>
        <div className='input-container'>
          <input type='text' />
          <button>+ADD</button>
        </div>
        <h6 className='success-message'>Member added successfully</h6>
        {/* Members */}
        <div className='members-container'>
          <div className='member'>
            <h3 className='member-name'>1. Ravi Kashyap</h3>
            <i className='fas fa-edit'></i>
            <i className='fas fa-trash'></i>
          </div>
          <div className='member'>
            <h3 className='member-name'>2. Raj Singh</h3>
            <i className='fas fa-edit'></i>
            <i className='fas fa-trash'></i>
          </div>
          <div className='member'>
            <h3 className='member-name'>3. Manish Kumar</h3>
            <i className='fas fa-edit'></i>
            <i className='fas fa-trash'></i>
          </div>
          <div className='member'>
            <h3 className='member-name'>4. Ankit Kumar</h3>
            <i className='fas fa-edit'></i>
            <i className='fas fa-trash'></i>
          </div>
          <div className='member'>
            <h3 className='member-name'>5. Ashish Kumar</h3>
            <i className='fas fa-edit'></i>
            <i className='fas fa-trash'></i>
          </div>
          <div className='member'>
            <h3 className='member-name'>6. Shivam Thakur</h3>
            <i className='fas fa-edit'></i>
            <i className='fas fa-trash'></i>
          </div>
        </div>
        <h5>
          Done adding members? <Link to='dashboard'>Click here</Link> to start
          managing expense
        </h5>
      </div>
    </div>
  );
};

export default Members;
