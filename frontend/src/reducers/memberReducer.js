import {
  MEMBER_CREATE_REQUEST,
  MEMBER_CREATE_SUCCESS,
  MEMBER_CREATE_FAIL,
  MEMBER_CREATE_ERROR_CLEAR,
  MEMBER_UPDATE_REQUEST,
  MEMBER_UPDATE_SUCCESS,
  MEMBER_UPDATE_FAIL,
  MEMBER_UPDATE_ERROR_CLEAR,
  MEMBER_DELETE_REQUEST,
  MEMBER_DELETE_SUCCESS,
  MEMBER_DELETE_FAIL,
  MEMBER_DELETE_ERROR_CLEAR
} from '../constants/memberConstants'

export const memberCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_CREATE_REQUEST:
      return { loading: true }
    case MEMBER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true
      }
    case MEMBER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case MEMBER_CREATE_ERROR_CLEAR:
      return { error: '' }
    default:
      return state
  }
}

export const memberUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_UPDATE_REQUEST:
      return { loading: true }
    case MEMBER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true
      }
    case MEMBER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case MEMBER_UPDATE_ERROR_CLEAR:
      return { error: '' }
    default:
      return state
  }
}

export const memberDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DELETE_REQUEST:
      return { loading: true }
    case MEMBER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload
      }
    case MEMBER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case MEMBER_DELETE_ERROR_CLEAR:
      return { ...state, error: '', message: '' }
    default:
      return state
  }
}
