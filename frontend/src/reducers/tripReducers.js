import {
  TRIPS_LIST_REQUEST,
  TRIPS_LIST_SUCCESS,
  TRIPS_LIST_FAIL,
  TRIP_DETAILS_REQUEST,
  TRIP_DETAILS_SUCCESS,
  TRIP_DETAILS_FAIL,
  TRIP_CREATE_REQUEST,
  TRIP_CREATE_SUCCESS,
  TRIP_CREATE_FAIL,
  TRIP_DELETE_REQUEST,
  TRIP_DELETE_SUCCESS,
  TRIP_DELETE_FAIL,
  TRIP_MEMBERS_REQUEST,
  TRIP_MEMBERS_SUCCESS,
  TRIP_MEMBERS_FAIL,
  MEMBER_CREATE_REQUEST,
  MEMBER_CREATE_SUCCESS,
  MEMBER_CREATE_FAIL,
  MEMBER_CREATE_CLEAR_ERROR,
  MEMBER_UPDATE_REQUEST,
  MEMBER_UPDATE_SUCCESS,
  MEMBER_UPDATE_FAIL,
  MEMBER_UPDATE_CLEAR_ERROR
} from '../constants/tripConstants'

export const userTripsReducer = (state = {}, action) => {
  switch (action.type) {
    case TRIPS_LIST_REQUEST:
      return { ...state, loading: true }
    case TRIPS_LIST_SUCCESS:
      return { loading: false, trips: action.payload }
    case TRIPS_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const tripDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case TRIP_DETAILS_REQUEST:
      return { ...state, loading: true }
    case TRIP_DETAILS_SUCCESS:
      return {
        loading: false,
        tripData: action.payload,
        currTripId: action.payload._id
      }
    case TRIP_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const tripMembersReducer = (state = {}, action) => {
  switch (action.type) {
    case TRIP_MEMBERS_REQUEST:
      return { ...state, loading: true }
    case TRIP_MEMBERS_SUCCESS:
      return {
        loading: false,
        members: action.payload
      }
    case TRIP_MEMBERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const tripCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRIP_CREATE_REQUEST:
      return { loading: true }
    case TRIP_CREATE_SUCCESS:
      return {
        loading: false,
        success: true
      }
    case TRIP_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const tripDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TRIP_DELETE_REQUEST:
      return { loading: true }
    case TRIP_DELETE_SUCCESS:
      return {
        loading: false,
        success: true
      }
    case TRIP_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

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
