import express from 'express'

import {
  authUser,
  registerUser,
  getUsers
} from '../controllers/userController.js'

const router = express.Router()

router.get('/', getUsers)
router.post('/login', authUser)
router.post('/', registerUser)

export default router
