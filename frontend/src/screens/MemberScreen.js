import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import {
  listTripMembers,
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
  const memberUpdate = useSelector(state => state.memberUpdate)
  const memberCreate = useSelector(state => state.memberCreate)
  const { members, loading } = membersData
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate
  } = memberUpdate
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate
  } = memberCreate
  const { currTripId } = currTrip
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listTripMembers(currTripId))
    }
  }, [history, userInfo, dispatch, currTripId, successCreate, successUpdate])

  const onClickHandler = () => {
    if (isUpdate) {
      dispatch(updateMember({ name }, memberId))
      setIsUpdate(false)
    } else {
      dispatch(createMember({ name }))
    }
    setName('')
  }

  return (
    <div className='members'>
      <h3 className='suggestions'>
        Kindly first <span>add members</span> in order to start managing
        expenses
      </h3>
      {errorUpdate ? (
        <Message>{errorUpdate}</Message>
      ) : errorCreate ? (
        <Message>{errorCreate}</Message>
      ) : null}
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
          <button
            className='clear-btn'
            onClick={() => {
              setName('')
              setIsUpdate(false)
            }}
          >
            <i className='fas fa-times'></i>
          </button>
          <button className='add-update-btn' onClick={onClickHandler}>
            {isUpdate ? 'UPDATE' : '+ADD'}
          </button>
        </div>
        {/* <h6 className='message'>{msg}</h6> */}
        <div className='members-container'>
          {loading || loadingUpdate || loadingCreate ? (
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
          Done adding members?{' '}
          <Link to={`/trip/${currTripId}`}>Click here</Link> to start managing
          expense
        </h5>
      </div>
    </div>
  )
}

export default MemberScreen
