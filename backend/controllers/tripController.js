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

// Method   POST
// Route    api/trips/:id/members/:id
// Desc.    Add new member
// Access   Private
const addMember = asyncHandler(async (req, res) => {
  const { name } = req.body
  if (!name) {
    res.status(400)
    throw new Error('Kindly provide a name')
  }

  const user = await User.findById(req.user._id)
  if (user) {
    const trip = user.trips.find(
      t => t._id.toString() === req.params.id.toString()
    )
    const { name } = req.body
    trip.membersData.push({ name })
    await user.save()
    res.status(201).json({ message: 'Member added' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// Method   UPDATE
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
  if (user) {
    const trip = user.trips.find(
      t => t._id.toString() === req.params.id.toString()
    )
    const member = trip.membersData.find(
      m => m._id.toString() === req.params.memberId.toString()
    )
    member.name = name
    const updatedMember = await user.save()

    res.send(updatedMember)
  } else {
    res.status(404)
    throw new Error('User not found')
  }

  // const updatedMemberDetails = await User.updateOne(
  //   { _id: req.user._id },
  //   { $set: { 'trips.$[].membersData.$[member_field].name': newName } },
  //   {
  //     arrayFilters: [{ 'member_field._id': req.params.memberId.toString() }]
  //   }
  // )

  // const reet = await User.find({
  //   'trips.membersData._id': req.params.memberId
  // })

  // const reet = await User.find({
  //   trips: {
  //     $elemMatch: {
  //       _id: req.params.id,
  //       membersData: {
  //         $elemMatch: {
  //           _id: req.params.memberId
  //         }
  //       }
  //     }
  //   }
  // })
  // console.log(reet)
  // console.log(updatedMemberDetails)
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
