import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  getUserTrips,
  getTripData,
  getTripMembers
} from '../controllers/tripController.js'

const router = express.Router()

router.route('/').get(protect, getUserTrips)
router.route('/:id').get(protect, getTripData)
router.route('/:id/members').get(protect, getTripMembers)

export default router
