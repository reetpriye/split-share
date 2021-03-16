import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  addTransaction,
  getLastTransactions,
  getAllTransactions
} from '../controllers/transactionController.js'

const router = express.Router()

router.route('/').put(protect, addTransaction)
router.route('/:id').get(protect, getAllTransactions)
router.route('/:id/last').get(protect, getLastTransactions)

export default router
