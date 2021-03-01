import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { getUserTrips, getTripDetails } from '../controllers/tripController.js'

const router = express.Router()

router.route('/').get(protect, getUserTrips)
router.route('/:id').get(protect, getTripDetails)

export default router
