import axios from 'axios'
import {
  TRANSACTION_LAST_LIST_REQUEST,
  TRANSACTION_LAST_LIST_SUCCESS,
  TRANSACTION_LAST_LIST_FAIL,
  TRANSACTION_ALL_LIST_REQUEST,
  TRANSACTION_ALL_LIST_SUCCESS,
  TRANSACTION_ALL_LIST_FAIL,
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_CREATE_FAIL
} from '../constants/transactionConstants'
import { logout } from './userActions'

export const listLastTransactions = tripId => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRANSACTION_LAST_LIST_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/transactions/${tripId}/last`, config)

    dispatch({
      type: TRANSACTION_LAST_LIST_SUCCESS,
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
      type: TRANSACTION_LAST_LIST_FAIL,
      payload: message
    })
  }
}

export const listAllTransactions = tripId => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRANSACTION_ALL_LIST_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/transactions/${tripId}`, config)

    dispatch({
      type: TRANSACTION_ALL_LIST_SUCCESS,
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
      type: TRANSACTION_ALL_LIST_FAIL,
      payload: message
    })
  }
}

export const createTransaction = ({ transaction }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: TRANSACTION_CREATE_REQUEST
    })
    console.log('From transactionActions')
    console.log(transaction)
    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    await axios.put('/api/transactions/', { transaction }, config)

    dispatch({ type: TRANSACTION_CREATE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TRANSACTION_CREATE_FAIL,
      payload: message
    })
  }
}
