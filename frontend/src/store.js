import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import {
  userExpensesReducer,
  expenseDeleteReducer,
  expenseCreateReducer,
  expenseDetailsReducer,
  expenseMembersReducer
} from './reducers/expenseReducers'
import {
  memberCreateReducer,
  memberUpdateReducer,
  memberDeleteReducer
} from './reducers/memberReducer'
import {
  transactionAllListReducer,
  transactionLastListReducer,
  transactionTrashListReducer,
  transactionCreateReducer,
  transactionDeleteReducer
} from './reducers/transactionReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userExpenses: userExpensesReducer,
  currExpense: expenseDetailsReducer,
  expenseDelete: expenseDeleteReducer,
  expenseCreate: expenseCreateReducer,
  membersData: expenseMembersReducer,
  memberCreate: memberCreateReducer,
  memberUpdate: memberUpdateReducer,
  memberDelete: memberDeleteReducer,
  transactionCreate: transactionCreateReducer,
  transactionDelete: transactionDeleteReducer,
  expenseAllTransactions: transactionAllListReducer,
  expenseLastTransactions: transactionLastListReducer,
  expenseTrashTransactions: transactionTrashListReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const currExpenseIdFromStorage = localStorage.getItem('currExpenseId')
  ? JSON.parse(localStorage.getItem('currExpenseId'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  currExpense: { currExpenseId: currExpenseIdFromStorage }
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
