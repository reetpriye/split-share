import axios from 'axios'
import {
  MEMBER_CREATE_REQUEST,
  MEMBER_CREATE_SUCCESS,
  MEMBER_CREATE_FAIL,
  MEMBER_CREATE_CLEAR_ERROR,
  MEMBER_UPDATE_REQUEST,
  MEMBER_UPDATE_SUCCESS,
  MEMBER_UPDATE_FAIL,
  MEMBER_UPDATE_CLEAR_ERROR
} from '../constants/memberConstants'
import { logout } from '../actions/userActions'

export const createMember = ({ name }) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMBER_CREATE_REQUEST
    })

    const {
      userLogin: { userInfo },
      currExpense: { currExpenseId }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.post(
      `/api/expenses/${currExpenseId}/members/`,
      { name },
      config
    )

    dispatch({
      type: MEMBER_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: MEMBER_CREATE_FAIL,
      payload: message
    })
    setTimeout(() => {
      dispatch({
        type: MEMBER_CREATE_CLEAR_ERROR
      })
    }, 3000)
  }
}

export const updateMember = ({ name }, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMBER_UPDATE_REQUEST
    })
    const {
      userLogin: { userInfo },
      currExpense: { currExpenseId }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.put(
      `/api/expenses/${currExpenseId}/members/${id}`,
      { name },
      config
    )

    dispatch({
      type: MEMBER_UPDATE_SUCCESS
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: MEMBER_UPDATE_FAIL,
      payload: message
    })
    setTimeout(() => {
      dispatch({
        type: MEMBER_UPDATE_CLEAR_ERROR
      })
    }, 3000)
  }
}
