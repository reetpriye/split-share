import axios from 'axios'
import {
  EXPENSE_LIST_REQUEST,
  EXPENSE_LIST_SUCCESS,
  EXPENSE_LIST_FAIL,
  EXPENSE_CREATE_REQUEST,
  EXPENSE_CREATE_SUCCESS,
  EXPENSE_CREATE_FAIL,
  EXPENSE_DELETE_REQUEST,
  EXPENSE_DELETE_SUCCESS,
  EXPENSE_DELETE_FAIL,
  EXPENSE_DETAILS_REQUEST,
  EXPENSE_DETAILS_SUCCESS,
  EXPENSE_DETAILS_FAIL,
  EXPENSE_MEMBERS_REQUEST,
  EXPENSE_MEMBERS_SUCCESS,
  EXPENSE_MEMBERS_FAIL
} from '../constants/expenseConstants'

import { logout } from './userActions'

export const listUserExpense = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXPENSE_LIST_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/expenses/`, config)

    dispatch({
      type: EXPENSE_LIST_SUCCESS,
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
      type: EXPENSE_LIST_FAIL,
      payload: message
    })
  }
}

export const getExpenseDetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXPENSE_DETAILS_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/expenses/${id}`, config)

    dispatch({
      type: EXPENSE_DETAILS_SUCCESS,
      payload: data
    })

    localStorage.setItem('currExpenseId', JSON.stringify(data._id))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: EXPENSE_DETAILS_FAIL,
      payload: message
    })
  }
}

export const createExpense = expenseName => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXPENSE_CREATE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    await axios.post('/api/expenses/', { expenseName }, config)

    dispatch({ type: EXPENSE_CREATE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: EXPENSE_CREATE_FAIL,
      payload: message
    })
  }
}

export const deleteExpense = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXPENSE_DELETE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(`/api/expenses/${id}`, config)

    dispatch({ type: EXPENSE_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: EXPENSE_DELETE_FAIL,
      payload: message
    })
  }
}

export const listExpenseMembers = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXPENSE_MEMBERS_REQUEST
    })
    const {
      userLogin: { userInfo },
      currExpense
    } = getState()

    currExpense.currExpenseId = id

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.get(`/api/expenses/${id}/members`, config)

    dispatch({
      type: EXPENSE_MEMBERS_SUCCESS,
      payload: data
    })
    localStorage.setItem('currExpenseId', JSON.stringify(id))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: EXPENSE_MEMBERS_FAIL,
      payload: message
    })
  }
}
