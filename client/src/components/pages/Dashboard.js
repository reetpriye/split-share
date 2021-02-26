import React from 'react';

import './styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className='trip-details'>
        <h5 className='trip-name'>TRIP: NOT SAVED</h5>
        <button className='trip-save-btn'>Save?</button>
      </div>
      <div className='total-expense-container'>
        <h3>Total Expense</h3>
        <h1>₹0</h1>
      </div>
      <div className='new-item-container'>
        <h3 className='sub-heading'>Add New Item</h3>
        <div className='new-item-inp-container'>
          <input type='number' />
          <button>+ADD</button>
        </div>

        <h3 className='new-item-type'>Payer</h3>
        <div className='new-item-payer'>
          <div className='payer'>
            <input type='checkbox' />
            <h5>Ravi Kashyap</h5>
          </div>
          <div className='payer'>
            <input type='checkbox' />
            <h5>Preet Priye</h5>
          </div>
          <div className='payer'>
            <input type='checkbox' />
            <h5>Aashish Kumar</h5>
          </div>
          <div className='payer'>
            <input type='checkbox' />
            <h5>Raj Singh</h5>
          </div>
          <div className='payer'>
            <input type='checkbox' />
            <h5>Ankit Kumar</h5>
          </div>
          <div className='payer'>
            <input type='checkbox' />
            <h5>Manish Kumar</h5>
          </div>
        </div>

        <h3 className='new-item-type'>Exclude</h3>
        <div className='new-item-exclude'>
          <div className='exclude'>
            <input type='checkbox' />
            <h5>Ravi Kashyap</h5>
          </div>
          <div className='exclude'>
            <input type='checkbox' />
            <h5>Preet Priye</h5>
          </div>
          <div className='exclude'>
            <input type='checkbox' />
            <h5>Aashish Kumar</h5>
          </div>
          <div className='exclude'>
            <input type='checkbox' />
            <h5>Raj Singh</h5>
          </div>
          <div className='exclude'>
            <input type='checkbox' />
            <h5>Ankit Kumar</h5>
          </div>
          <div className='exclude'>
            <input type='checkbox' />
            <h5>Manish Kumar</h5>
          </div>
        </div>
      </div>

      {/* Member's Share */}
      <div className='members-share-container'>
        <h3 className='sub-heading'>Member's Share</h3>
        <div className='member-share'>
          <h5>Ravi Kashyap</h5>
          <h5 className='member-share-amount'>206</h5>
        </div>
        <div className='line' />
        <div className='member-share'>
          <h5>Preet Priye</h5>
          <h5 className='member-share-amount'>484</h5>
        </div>
        <div className='line' />
        <div className='member-share'>
          <h5>Aashish Kumar</h5>
          <h5 className='member-share-amount'>486</h5>
        </div>
        <div className='line' />
        <div className='member-share'>
          <h5>Raj Singh</h5>
          <h5 className='member-share-amount'>454</h5>
        </div>
        <div className='line' />
        <div className='member-share'>
          <h5>Ankit Kumar</h5>
          <h5 className='member-share-amount'>643</h5>
        </div>
        <div className='line' />
        <div className='member-share'>
          <h5>Manish Kumar</h5>
          <h5 className='member-share-amount'>654</h5>
        </div>
      </div>

      <div className='pie-chart'>
        <h2>PIE CHART</h2>
      </div>
      <div className='line-chart'>
        <h2>LINE CHART</h2>
      </div>
    </div>
  );
};

export default Dashboard;
