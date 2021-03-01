import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './styles/Member.css'

const MemberScreen = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    const fetchUsers = async (req, res) => {
      const usersData = await axios.get('/api/users')

      const { data } = usersData

      setUsers(data)
    }

    fetchUsers()
  }, [])
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
          {users &&
            users[0].trips[0].membersData.map(member => (
              <div key={member._id} className='member'>
                <h3 className='member-name'>{member.name}</h3>
                <i className='fas fa-edit'></i>
                <i className='fas fa-trash'></i>
              </div>
            ))}
        </div>
        <h5>
          Done adding members? <Link to='dashboard'>Click here</Link> to start
          managing expense
        </h5>
      </div>
    </div>
  )
}

export default MemberScreen
