import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// Method   GET
// Route    api/trips/
// Desc.    Get trip details
// Access   Private
const getUserTrips = asyncHandler(async (req, res) => {
  const tripDetails = await User.findById(req.user._id)

  res.send(tripDetails.trips)
})

// Method   GET
// Route    api/trips/
// Desc.    Get trip details
// Access   Private
const getTripData = asyncHandler(async (req, res) => {
  const tripDetails = await User.findById(req.user._id).select({
    trips: { $elemMatch: { _id: req.params.id } }
  })

  // const tripDetails = await User.findOne({
  //   'trips._id': req.params.id
  // }).select({
  //   trips: { $elemMatch: { _id: req.params.id } }
  // })

  res.json(tripDetails.trips[0])
})

// Method   GET
// Route    api/trips/:id
// Desc.    Get trip details
// Access   Private
const getTripMembers = asyncHandler(async (req, res) => {
  const tripDetails = await User.findById(req.user._id).select({
    trips: { $elemMatch: { _id: req.params.id } }
  })

  res.send(tripDetails.trips[0].membersData)
})

export { getTripData, getUserTrips, getTripMembers }
