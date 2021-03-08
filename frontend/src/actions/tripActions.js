import axios from 'axios'
import {
  TRIPS_LIST_REQUEST,
  TRIPS_LIST_SUCCESS,
  TRIPS_LIST_FAIL,
  TRIP_CREATE_REQUEST,
  TRIP_CREATE_SUCCESS,
  TRIP_CREATE_FAIL,
  TRIP_DELETE_REQUEST,
  TRIP_DELETE_SUCCESS,
  TRIP_DELETE_FAIL,
  TRIP_DETAILS_REQUEST,
  TRIP_DETAILS_SUCCESS,
  TRIP_DETAILS_FAIL,
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

import { logout } from './userActions'

export const listUserTrips = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRIPS_LIST_REQUEST
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
      type: TRIPS_LIST_SUCCESS,
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
      type: TRIPS_LIST_FAIL,
      payload: message
    })
  }
}

// For dashboard screen

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

    localStorage.setItem('currTripId', JSON.stringify(data._id))
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

export const createTrip = tripName => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRIP_CREATE_REQUEST
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
    await axios.post('/api/trips/', { tripName }, config)

    dispatch({ type: TRIP_CREATE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TRIP_CREATE_FAIL,
      payload: message
    })
  }
}

export const deleteTrip = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRIP_DELETE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(`/api/trips/${id}`, config)

    dispatch({ type: TRIP_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TRIP_DELETE_FAIL,
      payload: message
    })
  }
}

// For members screen

export const listTripMembers = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRIP_MEMBERS_REQUEST
    })
    const {
      userLogin: { userInfo },
      currTrip
    } = getState()

    currTrip.currTripId = id

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.get(`/api/trips/${id}/members`, config)

    dispatch({
      type: TRIP_MEMBERS_SUCCESS,
      payload: data
    })
    localStorage.setItem('currTripId', JSON.stringify(id))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TRIP_MEMBERS_FAIL,
      payload: message
    })
  }
}

export const createMember = ({ name }) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMBER_CREATE_REQUEST
    })

    const {
      userLogin: { userInfo },
      currTrip: { currTripId }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.post(
      `/api/trips/${currTripId}/members/`,
      { name },
      config
    )

    dispatch({
      type: MEMBER_CREATE_SUCCESS,
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
      type: MEMBER_CREATE_FAIL,
      payload: message
    })
    setTimeout(() => {
      dispatch({
        type: MEMBER_CREATE_CLEAR_ERROR
      })
    }, 3000)
  }
}

export const updateMember = ({ name }, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMBER_UPDATE_REQUEST
    })
    const {
      userLogin: { userInfo },
      currTrip: { currTripId }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.put(`/api/trips/${currTripId}/members/${id}`, { name }, config)

    dispatch({
      type: MEMBER_UPDATE_SUCCESS
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
      type: MEMBER_UPDATE_FAIL,
      payload: message
    })
    setTimeout(() => {
      dispatch({
        type: MEMBER_UPDATE_CLEAR_ERROR
      })
    }, 3000)
  }
}
