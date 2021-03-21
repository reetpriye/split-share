import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  addTransaction,
  deleteTransaction,
  getAllTransactions,
  getLastTransactions,
  getTrashTransactions
} from '../controllers/transactionController.js'

const router = express.Router()

router.route('/').post(protect, addTransaction)
router
  .route('/:id')
  .get(protect, getAllTransactions)
  .put(protect, deleteTransaction)
router.route('/:id/last').get(protect, getLastTransactions)
router.route('/:id/trash').get(protect, getTrashTransactions)

export default router
