import React, { useEffect, useState, Fragment } from 'react'
import { CSSTransition } from 'react-transition-group'
import Dash from '../components/Dash'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import {
  createMember,
  updateMember,
  deleteMember
} from '../actions/memberActions'
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

  const userLogin = useSelector(state => state.userLogin)
  const currExpense = useSelector(state => state.currExpense)
  const membersData = useSelector(state => state.membersData)
  const memberCreate = useSelector(state => state.memberCreate)
  const memberUpdate = useSelector(state => state.memberUpdate)
  const memberDelete = useSelector(state => state.memberDelete)

  const { userInfo } = userLogin
  const { currExpenseId } = currExpense
  const { members, loading } = membersData
  const {
    loading: loadingCreate,
    success: successCreate,
    message: messageCreate,
    error: errorCreate
  } = memberCreate
  const {
    loading: loadingUpdate,
    success: successUpdate,
    message: messageUpdate,
    error: errorUpdate
  } = memberUpdate
  const {
    loading: loadingDelete,
    success: successDelete,
    message: messageDelete,
    error: errorDelete
  } = memberDelete

  useEffect(() => {
    if (successDelete) {
      dispatch(listExpenseMembers(currExpenseId))
    }
  }, [
    history,
    dispatch,
    currExpenseId,
    successCreate,
    successUpdate,
    successDelete
  ])

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
    <div className='member-main-container'>
      <h2 className='heading'>Members</h2>
      {membersData.members && membersData.members.length === 0 && (
        <h4 id='member-message'>
          HI, {userInfo && userInfo.name.toUpperCase().split(' ')[0]}. KINDLY
          FIRST <span>ADD MEMBERS</span> IN ORDER TO START MANAGING EXPENSES
        </h4>
      )}

      {errorCreate ? (
        <Message variant={'danger'}>{errorCreate}</Message>
      ) : errorUpdate ? (
        <Message variant={'danger'}>{errorUpdate}</Message>
      ) : (
        errorDelete && <Message variant={'danger'}>{errorDelete}</Message>
      )}

      <section
        className={
          members && members.length > 0
            ? 'add-member-container-xl'
            : 'add-member-container-xs'
        }
      >
        <h6>
          ADD NEW MEMBER <i className='fas fa-user-circle'></i>
        </h6>
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

          {messageCreate ? (
            <CSSTransition
              in={true}
              classNames={'add-member-success-message-'}
              timeout={{ enter: 1000, exit: 1000 }}
              appear={true}
            >
              <h6 id='add-member-success-message'>{messageCreate}</h6>
            </CSSTransition>
          ) : messageDelete ? (
            <CSSTransition
              in={messageDelete.length}
              classNames={'delete-member-success-message-'}
              timeout={{ enter: 1000, exit: 1000 }}
              appear={true}
            >
              <h6 id='delete-member-success-message'>{messageDelete}</h6>
            </CSSTransition>
          ) : (
            <div id='placeholder-div' />
          )}

          {members && members.length > 0 && (
            <h5 id='done-adding-members'>
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
          )}
        </form>
      </section>

      <section className='member-list-container'>
        <h2 className='sub-heading'>
          MEMBER LIST <i className='fas fa-money-check-alt'></i>
        </h2>
        {loading || loadingCreate || loadingUpdate || loadingDelete ? (
          <Loader width={'311px'} height={'128px'} />
        ) : (
          members &&
          members.map(member => (
            <Fragment key={member._id}>
              <div className='member'>
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
                  type='button'
                  onClick={() =>
                    dispatch(deleteMember(currExpenseId, member._id))
                  }
                >
                  <i className='fas fa-times'></i>
                </button>
              </div>
              <Dash />
            </Fragment>
          ))
        )}
      </section>
    </div>
  )
}

export default MemberScreen
