import {
  USER_TRIPS_REQUEST,
  USER_TRIPS_SUCCESS,
  USER_TRIPS_FAIL,
  TRIP_DETAILS_REQUEST,
  TRIP_DETAILS_SUCCESS,
  TRIP_DETAILS_FAIL,
  TRIP_MEMBERS_REQUEST,
  TRIP_MEMBERS_SUCCESS,
  TRIP_MEMBERS_FAIL,
  ADD_TRIP_REQUEST,
  ADD_TRIP_SUCCESS,
  ADD_TRIP_FAIL,
  DELETE_TRIP_REQUEST,
  DELETE_TRIP_SUCCESS,
  DELETE_TRIP_FAIL
} from '../constants/tripConstants'

export const userTripsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_TRIPS_REQUEST:
      return { ...state, loading: true }
    case USER_TRIPS_SUCCESS:
      return { loading: false, trips: action.payload }
    case USER_TRIPS_FAIL:
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

export const addTripReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TRIP_REQUEST:
      return { ...state, loading: true }
    case ADD_TRIP_SUCCESS:
      return {
        loading: false,
        trips: action.payload
      }
    case ADD_TRIP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteTripReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TRIP_REQUEST:
      return { ...state, loading: true }
    case DELETE_TRIP_SUCCESS:
      return {
        loading: false,
        success: true
      }
    case DELETE_TRIP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}