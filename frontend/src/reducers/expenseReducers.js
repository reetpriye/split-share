import {
  EXPENSE_LIST_REQUEST,
  EXPENSE_LIST_SUCCESS,
  EXPENSE_LIST_FAIL,
  EXPENSE_DETAILS_REQUEST,
  EXPENSE_DETAILS_SUCCESS,
  EXPENSE_DETAILS_FAIL,
  EXPENSE_DETAILS_CLEAR_STATE,
  EXPENSE_CREATE_REQUEST,
  EXPENSE_CREATE_SUCCESS,
  EXPENSE_CREATE_FAIL,
  EXPENSE_DELETE_REQUEST,
  EXPENSE_DELETE_SUCCESS,
  EXPENSE_DELETE_FAIL,
  EXPENSE_MEMBERS_REQUEST,
  EXPENSE_MEMBERS_SUCCESS,
  EXPENSE_MEMBERS_FAIL,
  EXPENSE_CREATE_MESSAGE_CLEAR,
  EXPENSE_DELETE_MESSAGE_CLEAR
} from '../constants/expenseConstants'

export const userExpensesReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_LIST_REQUEST:
      return { ...state, loading: true }
    case EXPENSE_LIST_SUCCESS:
      return { loading: false, expenses: action.payload }
    case EXPENSE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const expenseDetailsReducer = (state = { expenseData: [] }, action) => {
  switch (action.type) {
    case EXPENSE_DETAILS_REQUEST:
      return { ...state, loading: true }
    case EXPENSE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        expenseData: action.payload,
        currExpenseId: action.payload._id
      }
    case EXPENSE_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload }
    case EXPENSE_DETAILS_CLEAR_STATE:
      return {}
    default:
      return state
  }
}
export const expenseMembersReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_MEMBERS_REQUEST:
      return { ...state, loading: true }
    case EXPENSE_MEMBERS_SUCCESS:
      return {
        loading: false,
        members: action.payload
      }
    case EXPENSE_MEMBERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const expenseCreateReducer = (state = { success: true }, action) => {
  switch (action.type) {
    case EXPENSE_CREATE_REQUEST:
      return { ...state, success: false, loading: true }
    case EXPENSE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload
      }
    case EXPENSE_CREATE_FAIL:
      return { loading: false, error: action.payload, success: true }
    case EXPENSE_CREATE_MESSAGE_CLEAR:
      return { ...state, error: '', message: '' }
    default:
      return state
  }
}

export const expenseDeleteReducer = (state = { success: true }, action) => {
  switch (action.type) {
    case EXPENSE_DELETE_REQUEST:
      return { ...state, success: false, loading: true }
    case EXPENSE_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload
      }
    case EXPENSE_DELETE_FAIL:
      return { loading: false, error: action.payload, success: true }
    case EXPENSE_DELETE_MESSAGE_CLEAR:
      return { ...state, error: '', message: '' }
    default:
      return state
  }
}
