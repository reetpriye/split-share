import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import {
  userTripsReducer,
  tripDeleteReducer,
  tripCreateReducer,
  tripDetailsReducer,
  tripMembersReducer,
  memberCreateReducer,
  memberUpdateReducer
} from './reducers/tripReducers'
import {
  transactionLastListReducer,
  transactionAllListReducer,
  transactionCreateReducer
} from './reducers/transactionReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userTrips: userTripsReducer,
  currTrip: tripDetailsReducer,
  tripDelete: tripDeleteReducer,
  tripCreate: tripCreateReducer,
  membersData: tripMembersReducer,
  memberCreate: memberCreateReducer,
  memberUpdate: memberUpdateReducer,
  transactionCreate: transactionCreateReducer,
  tripLastTransactions: transactionLastListReducer,
  tripAllTransactions: transactionAllListReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const currTripIdFromStorage = localStorage.getItem('currTripId')
  ? JSON.parse(localStorage.getItem('currTripId'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  currTrip: { currTripId: currTripIdFromStorage }
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
