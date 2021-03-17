import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { createMember, updateMember } from '../actions/memberActions'
import {
  listExpenseMembers,
  getExpenseDetails
} from '../actions/expenseActions'

import './styles/Member.css'

const MemberScreen = ({ history, match }) => {
  const [name, setName] = useState('')
  const [memberId, setMemberId] = useState()
  const [isUpdate, setIsUpdate] = useState(false)

  const dispatch = useDispatch()

  const currExpense = useSelector(state => state.currExpense)
  const membersData = useSelector(state => state.membersData)
  const memberCreate = useSelector(state => state.memberCreate)
  const memberUpdate = useSelector(state => state.memberUpdate)

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
  const { currExpenseId } = currExpense

  useEffect(() => {
    dispatch(listExpenseMembers(currExpenseId))
  }, [history, dispatch, currExpenseId, successCreate, successUpdate])

  const onSubmitHandler = e => {
    e.preventDefault()
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
      {membersData.members && membersData.members.length === 0 && (
        <h3 className='suggestions'>
          Kindly first <span>add members</span> in order to start managing
          expenses
        </h3>
      )}

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
        <form onSubmit={onSubmitHandler}>
          <div id='add-member-input-container'>
            <input
              required
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            {/* <button
              type='button'
              className='clear-btn btn'
              onClick={() => {
                setName('')
                setIsUpdate(false)
              }}
            >
              <i className='fas fa-times' />
            </button> */}
            <input
              type='submit'
              value={isUpdate ? 'UPDATE' : '+ADD'}
              className='btn'
            />
          </div>
        </form>

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
                  <i className='fas fa-pencil-alt'></i>
                </button>
                <button
                  className='delete-btn'
                  onClick={() => {
                    setIsUpdate(true)
                    setName(member.name)
                    setMemberId(member._id)
                  }}
                >
                  <i className='fas fa-times'></i>
                </button>
              </div>
            ))
          )}
        </div>

        <h5>
          Done adding members?{' '}
          <Link
            to={`/expense/${currExpenseId}`}
            onClick={() => {
              dispatch(getExpenseDetails(match.params.id))
            }}
          >
            Click here
          </Link>{' '}
          to start managing expense
        </h5>
      </div>
    </div>
  )
}

export default MemberScreen
