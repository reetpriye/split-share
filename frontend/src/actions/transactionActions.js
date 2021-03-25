import axios from 'axios'
import {
  TRANSACTION_ALL_LIST_REQUEST,
  TRANSACTION_ALL_LIST_SUCCESS,
  TRANSACTION_ALL_LIST_FAIL,
  TRANSACTION_LAST_LIST_REQUEST,
  TRANSACTION_LAST_LIST_SUCCESS,
  TRANSACTION_LAST_LIST_FAIL,
  TRANSACTION_TRASH_LIST_REQUEST,
  TRANSACTION_TRASH_LIST_SUCCESS,
  TRANSACTION_TRASH_LIST_FAIL,
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_CREATE_MESSAGE_CLEAR,
  TRANSACTION_DELETE_REQUEST,
  TRANSACTION_DELETE_SUCCESS,
  TRANSACTION_DELETE_FAIL,
  TRANSACTION_DELETE_MESSAGE_CLEAR
} from '../constants/transactionConstants'
import { logout } from './userActions'

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

export const listTrashTransactions = tripId => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRANSACTION_TRASH_LIST_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(
      `/api/transactions/${tripId}/trash`,
      config
    )

    dispatch({
      type: TRANSACTION_TRASH_LIST_SUCCESS,
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
      type: TRANSACTION_TRASH_LIST_FAIL,
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
    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    await axios.post('/api/transactions/', { transaction }, config)

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
  setTimeout(() => {
    dispatch({ type: TRANSACTION_CREATE_MESSAGE_CLEAR })
  }, 2500)
}

export const deleteTransaction = transactionId => async (
  dispatch,
  getState
) => {
  try {
    const {
      userLogin: { userInfo }
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    dispatch({ type: TRANSACTION_DELETE_REQUEST })
    const { data } = await axios.put(
      `/api/transactions/${transactionId}`,
      {},
      config
    )

    dispatch({ type: TRANSACTION_DELETE_SUCCESS, payload: data.msg })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TRANSACTION_DELETE_FAIL,
      payload: message
    })
  }
  setTimeout(() => {
    dispatch({ type: TRANSACTION_DELETE_MESSAGE_CLEAR })
  }, 2500)
}
