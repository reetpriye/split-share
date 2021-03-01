import {
  USER_TRIPS_REQUEST,
  USER_TRIPS_SUCCESS,
  USER_TRIPS_FAIL,
  TRIP_DETAILS_REQUEST,
  TRIP_DETAILS_SUCCESS,
  TRIP_DETAILS_FAIL
} from '../constants/tripConstants'

export const userTripsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_TRIPS_REQUEST:
      return { ...state, loading: true }
    case USER_TRIPS_SUCCESS:
      return { loading: false, userAllTrips: action.payload }
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
      return { loading: false, tripData: action.payload }
    case TRIP_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
