import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  getUserTrips,
  getTripData,
  getTripMembers,
  addTrip,
  deleteTrip
} from '../controllers/tripController.js'

const router = express.Router()

router.route('/').get(protect, getUserTrips).post(protect, addTrip)
router.route('/:id').get(protect, getTripData).delete(protect, deleteTrip)
router.route('/:id/members').get(protect, getTripMembers)

export default router
