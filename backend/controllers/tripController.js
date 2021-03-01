import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// Method   GET
// Route    api/trips/:id
// Desc.    Get trip details
// Access   Private
const getUserTrips = asyncHandler(async (req, res) => {
  console.log(req.user._id)
  const tripDetails = await User.findById(req.user._id)

  // Later supply the user id
  res.send(tripDetails.trips)
})

const getTripDetails = asyncHandler(async (req, res) => {
  const tripDetails = await User.findOne({
    'trips._id': req.params.id
  }).select({
    trips: { $elemMatch: { _id: req.params.id } }
  })

  // Later supply the user id
  res.json(tripDetails.trips[0])
})

export { getTripDetails, getUserTrips }
