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
    case MEMBER_CREATE_CLEAR_ERROR:
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
    case MEMBER_UPDATE_CLEAR_ERROR:
      return { error: '' }
    default:
      return state
  }
}
