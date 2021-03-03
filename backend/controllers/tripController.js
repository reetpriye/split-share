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

// Method   POST
// Route    api/trips/
// Desc.    Add new trip
// Access   Private
const addTrip = asyncHandler(async (req, res) => {
  const { tripName } = req.body

  try {
    const user = await User.findById(req.user._id)
    user.trips.push({ tripName })
    const updatedTrip = await user.save()

    res.send(updatedTrip)
  } catch (err) {
    res.status(404)
    throw new Error('User not found')
  }
})

// Method   DELETE
// Route    api/trips/:id
// Desc.    Delete existing trip
// Access   Private
const deleteTrip = asyncHandler(async (req, res) => {
  try {
    await User.updateOne({}, { $pull: { trips: { _id: req.params.id } } })
    res.json({ message: 'Trip removed' })
  } catch (err) {
    res.status(404)
    throw new Error('Trip not found')
  }
})

export { getTripData, getUserTrips, getTripMembers, addTrip, deleteTrip }
