import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  getUserExpenses,
  getExpenseData,
  getExpenseMembers,
  addExpense,
  deleteExpense,
  addMember,
  updateMember,
  deleteMember
} from '../controllers/expenseController.js'

const router = express.Router()

router.route('/').get(protect, getUserExpenses).post(protect, addExpense)
router.route('/:id').get(protect, getExpenseData).delete(protect, deleteExpense)
router
  .route('/:id/members')
  .get(protect, getExpenseMembers)
  .post(protect, addMember)
router
  .route('/:id/members/:memberId')
  .put(protect, updateMember)
  .delete(protect, deleteMember)

export default router
