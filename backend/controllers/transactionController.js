import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler'
import Transaction from '../models/transactionModel.js'
import User from '../models/userModel.js'

// Method   GET
// Route    api/transactions/:id
// Desc.    Get all the user's transactions
// Access   Private
const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ trip: req.params.id })
  res.json(transactions.splice(0, 5))
})

// Method   POST
// Route    api/transactions/
// Desc.    Add new transaction & update user's amount
// Access   Private
const addTransaction = asyncHandler(async (req, res) => {
  const {
    transaction: { trip: tripId, description, payers, excludes }
  } = req.body
  const user = await User.findById(req.user._id)
  const trip = user.trips.find(t => t._id.toString() === tripId)

  if (trip) {
    let { membersData } = trip
    const numberOfMembers = trip.membersData.length
    const numberOfConsumers = numberOfMembers - excludes.length
    const totalAmount = payers.reduce(
      (acc, payer) => Number(payer.amount) + acc,
      0
    )
    trip.totalExpense += totalAmount
    const shareAmount = (totalAmount / numberOfConsumers).toFixed(2)
    for (let i = 0; i < numberOfMembers; i++) {
      let isExcluded = false
      let isPayer = false
      for (let j = 0; j < excludes.length; j++) {
        if (excludes[j].member === membersData[i]._id.toString()) {
          isExcluded = true
          break
        }
      }
      let payerAmount
      for (let j = 0; j < payers.length; j++) {
        if (payers[j].member === membersData[i]._id.toString()) {
          payerAmount = payers[j].amount
          isPayer = true
          break
        }
      }

      if (isExcluded && isPayer) {
        membersData[i].amount += payerAmount
      } else if (isPayer && !isExcluded) {
        membersData[i].amount += payerAmount - shareAmount
      } else if (!isPayer && !isExcluded) {
        membersData[i].amount -= shareAmount
      } else {
        continue
      }
    }
    await user.save()

    const transaction = {
      user: req.user._id,
      trip: trip._id,
      totalAmount,
      description,
      payers: [],
      excludes: []
    }
    const updatedPayers = payers.map(p => ({
      member: mongoose.Types.ObjectId(p.member),
      name: p.name,
      amount: p.amount
    }))

    const updatedExcludes = excludes.map(e => ({
      member: mongoose.Types.ObjectId(e.member),
      name: e.name
    }))

    transaction.payers = updatedPayers
    transaction.excludes = updatedExcludes
    await Transaction.create(transaction)

    res.status(201).json({ msg: 'Transaction added successfully' })
  } else {
    res.status(404)
    throw new Error('Trip not found')
  }
})

export { addTransaction, getTransactions }
