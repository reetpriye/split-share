import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {
  getTripMembers,
  createMember,
  updateMember
} from '../actions/tripActions'

import './styles/Member.css'

const MemberScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [memberId, setMemberId] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const dispatch = useDispatch()
  const currTrip = useSelector(state => state.currTrip)
  const membersData = useSelector(state => state.membersData)
  const userLogin = useSelector(state => state.userLogin)
  const { currTripId } = currTrip
  const { userInfo } = userLogin
  const { members, loading } = membersData

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(getTripMembers(currTripId))
    }
  }, [history, userInfo, dispatch, currTripId])

  const onClickHandler = () => {
    if (isUpdate) {
      dispatch(updateMember({ name }, memberId))
      setIsUpdate(false)
      setName('')
    } else dispatch(createMember({ name }))
  }

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
          <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button onClick={onClickHandler}>
            {isUpdate ? 'UPDATE' : '+ADD'}
          </button>
        </div>
        <h6 className='success-message'>Member added successfully</h6>
        <div className='members-container'>
          {loading ? (
            <Loader />
          ) : (
            members &&
            members.length > 0 &&
            members.map(member => (
              <div key={member._id} className='member'>
                <h3 className='member-name'>{member.name}</h3>
                <button
                  className='edit-btn'
                  onClick={() => {
                    setIsUpdate(true)
                    setName(member.name)
                    setMemberId(member._id)
                  }}
                >
                  <i className='fas fa-edit'></i>
                </button>

                <i className='fas fa-trash'></i>
              </div>
            ))
          )}
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
