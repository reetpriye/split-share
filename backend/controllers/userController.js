import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// Method   POST
// Route    api/auth
// Desc.    Auth user and get token
// Access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// Method   POST
// Route    api/users
// Desc.    Register a user
// Access   Public
const registerUser = asyncHandler(async (req, res) => {
  let { password } = req.body
  const { name, email } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const salt = await bcrypt.genSalt(10)
  password = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({})
    // console.log(users)
    res.send(users)
  } catch (err) {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

export { authUser, registerUser, getUsers }
