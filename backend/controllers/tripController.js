import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// Method   GET
// Route    api/trips/
// Desc.    Get all user trips
// Access   Private
const getUserTrips = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  res.send(user.trips)
})

// Method   GET
// Route    api/trips/:id/members
// Desc.    Get trip members
// Access   Private
const getTripMembers = asyncHandler(async (req, res) => {
  const tripDetails = await User.findById(req.user._id).select({
    trips: { $elemMatch: { _id: req.params.id } }
  })

  res.send(tripDetails.trips[0].membersData)
})

// Method   GET
// Route    api/trips/:id
// Desc.    Get single trip details
// Access   Private
const getTripData = asyncHandler(async (req, res) => {
  const tripDetails = await User.findById(req.user._id).select({
    trips: { $elemMatch: { _id: req.params.id } }
  })

  res.json(tripDetails.trips[0])
})

// Method   POST
// Route    api/trips/
// Desc.    Add new trip
// Access   Private
const addTrip = asyncHandler(async (req, res) => {
  const { tripName } = req.body
  const user = await User.findById(req.user._id)
  user.trips.push({ tripName })
  await user.save()

  res.status(201).json({ msg: 'Trip added successfully' })
})

// Method   DELETE
// Route    api/trips/:id
// Desc.    Delete existing trip
// Access   Private
const deleteTrip = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    user.trips = user.trips.filter(
      trip => trip._id.toString() !== req.params.id.toString()
    )

    await user.save()

    res.status(201).json({ msg: 'Trip deleted successfully' })
  } catch (err) {
    res.status(404)
    throw new Error('Trip not found')
  }
})

// Method   POST
// Route    api/trips/:id/members/:memberId
// Desc.    Add new member
// Access   Private
const addMember = asyncHandler(async (req, res) => {
  const { name } = req.body
  if (!name) {
    res.status(400)
    throw new Error('Kindly provide a name')
  }

  const user = await User.findById(req.user._id)
  const trip = user.trips.find(
    t => t._id.toString() === req.params.id.toString()
  )

  if (trip) {
    trip.membersData.push({ name })
    await user.save()

    res.status(201).json({ msg: 'Member added successfully' })
  } else {
    res.status(404)
    throw new Error('Trip not found')
  }
})

// Method   PUT
// Route    api/trips/:id/members/:id
// Desc.    Update member details
// Access   Private
const updateMember = asyncHandler(async (req, res) => {
  const { name } = req.body
  if (!name) {
    res.status(400)
    throw new Error('Kindly provide a name')
  }

  const user = await User.findById(req.user._id)
  const trip = user.trips.find(
    t => t._id.toString() === req.params.id.toString()
  )
  const member = trip.membersData.find(
    m => m._id.toString() === req.params.memberId.toString()
  )
  member.name = name
  await user.save()

  res.status(201).json({ msg: 'Member updated successfully' })
})

export {
  getTripData,
  getUserTrips,
  getTripMembers,
  addTrip,
  deleteTrip,
  addMember,
  updateMember
}
