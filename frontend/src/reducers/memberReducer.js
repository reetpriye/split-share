import {
  MEMBER_CREATE_REQUEST,
  MEMBER_CREATE_SUCCESS,
  MEMBER_CREATE_FAIL,
  MEMBER_CREATE_MESSAGE_CLEAR,
  MEMBER_UPDATE_REQUEST,
  MEMBER_UPDATE_SUCCESS,
  MEMBER_UPDATE_FAIL,
  MEMBER_UPDATE_MESSAGE_CLEAR,
  MEMBER_DELETE_REQUEST,
  MEMBER_DELETE_SUCCESS,
  MEMBER_DELETE_FAIL,
  MEMBER_DELETE_MESSAGE_CLEAR
} from '../constants/memberConstants'

export const memberCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_CREATE_REQUEST:
      return { ...state, success: false, loading: true }
    case MEMBER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload
      }
    case MEMBER_CREATE_FAIL:
      return { loading: false, error: action.payload, success: true }
    case MEMBER_CREATE_MESSAGE_CLEAR:
      return { ...state, error: '', message: '' }
    default:
      return state
  }
}

export const memberUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_UPDATE_REQUEST:
      return { ...state, success: false, loading: true }
    case MEMBER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload
      }
    case MEMBER_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: true }
    case MEMBER_UPDATE_MESSAGE_CLEAR:
      return { ...state, error: '', message: '' }
    default:
      return state
  }
}

export const memberDeleteReducer = (state = { success: true }, action) => {
  switch (action.type) {
    case MEMBER_DELETE_REQUEST:
      return { ...state, success: false, loading: true }
    case MEMBER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload
      }
    case MEMBER_DELETE_FAIL:
      return { loading: false, error: action.payload, success: true }
    case MEMBER_DELETE_MESSAGE_CLEAR:
      return { ...state, error: '', message: '' }
    default:
      return state
  }
}
