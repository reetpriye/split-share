import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  addTransaction,
  getTransactions
} from '../controllers/transactionController.js'

const router = express.Router()

router.route('/').put(protect, addTransaction)
router.route('/:id').get(protect, getTransactions)

export default router
