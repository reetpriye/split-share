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

export const transactionAllListReducer = (
  state = { transactions: [] },
  action
) => {
  switch (action.type) {
    case TRANSACTION_ALL_LIST_REQUEST:
      return { loading: true }
    case TRANSACTION_ALL_LIST_SUCCESS:
      return {
        loading: false,
        transactions: action.payload,
        success: true
      }
    case TRANSACTION_ALL_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const transactionLastListReducer = (
  state = { transactions: [] },
  action
) => {
  switch (action.type) {
    case TRANSACTION_LAST_LIST_REQUEST:
      return { loading: true }
    case TRANSACTION_LAST_LIST_SUCCESS:
      return {
        loading: false,
        transactions: action.payload,
        success: true
      }
    case TRANSACTION_LAST_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const transactionTrashListReducer = (
  state = { transactions: [] },
  action
) => {
  switch (action.type) {
    case TRANSACTION_TRASH_LIST_REQUEST:
      return { loading: true }
    case TRANSACTION_TRASH_LIST_SUCCESS:
      return {
        loading: false,
        transactions: action.payload,
        success: true
      }
    case TRANSACTION_TRASH_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const transactionCreateReducer = (state = { success: true }, action) => {
  switch (action.type) {
    case TRANSACTION_CREATE_REQUEST:
      return { ...state, success: false, loading: true }
    case TRANSACTION_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload
      }
    case TRANSACTION_CREATE_FAIL:
      return { loading: false, error: action.payload, success: true }
    case TRANSACTION_CREATE_MESSAGE_CLEAR:
      return { ...state, error: '' }
    default:
      return state
  }
}

export const transactionDeleteReducer = (state = { success: true }, action) => {
  switch (action.type) {
    case TRANSACTION_DELETE_REQUEST:
      return { ...state, success: false, loading: true }
    case TRANSACTION_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload
      }
    case TRANSACTION_DELETE_FAIL:
      return { loading: false, error: action.payload, success: true }
    case TRANSACTION_DELETE_MESSAGE_CLEAR:
      return { ...state, error: '', message: '' }
    default:
      return state
  }
}
