import axios from 'axios'
import {
  TRIP_DETAILS_REQUEST,
  TRIP_DETAILS_SUCCESS,
  TRIP_DETAILS_FAIL,
  USER_TRIPS_REQUEST,
  USER_TRIPS_SUCCESS,
  USER_TRIPS_FAIL
} from '../constants/tripConstants'

import { logout } from './userActions'

export const getUserTrips = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_TRIPS_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/trips/`, config)

    dispatch({
      type: USER_TRIPS_SUCCESS,
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
      type: USER_TRIPS_FAIL,
      payload: message
    })
  }
}

export const getTripDetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRIP_DETAILS_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/trips/${id}`, config)

    dispatch({
      type: TRIP_DETAILS_SUCCESS,
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
      type: TRIP_DETAILS_FAIL,
      payload: message
    })
  }
}
