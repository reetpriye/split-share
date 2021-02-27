import express from 'express'
import { check, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import auth from '../middleware/auth.js'
import User from '../models/User.js'

const router = express.Router()

// Method   GET
// Route    api/auth
// Desc.    Get logged in user
// Access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error')
  }
})

// Method   POST
// Route    api/auth
// Desc.    Auth user and get token
// Access   Public
router.post(
  '/',
  [
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (!user) return res.status(400).json({ msg: 'Invalid Credentials' })

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' })

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
        if (err) throw err
        res.json({ token })
      })
    } catch (err) {
      console.error(err.message)
      res.status(400).send('Server Error')
    }
  }
)

export default router
