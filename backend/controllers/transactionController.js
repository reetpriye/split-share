import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler'
import Transaction from '../models/transactionModel.js'
import User from '../models/userModel.js'

// Method   GET
// Route    api/transactions/:id
// Desc.    Get all the user's transactions
// Access   Private
const getAllTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({
    expense: req.params.id,
    isTrash: false
  })
  res.json(transactions.reverse())
})

// Method   GET
// Route    api/transactions/:id/last
// Desc.    Get last 5 user's transactions
// Access   Private
const getLastTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({
    expense: req.params.id,
    isTrash: false
  })
  res.json(transactions.slice(-5).reverse())
})

// Method   GET
// Route    api/transactions/:id/trash
// Desc.    Get all the user's trash transactions
// Access   Private
const getTrashTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({
    expense: req.params.id,
    isTrash: true
  })
  res.json(transactions.reverse())
})

// Method   POST
// Route    api/transactions/
// Desc.    Add new transaction & update user's amount
// Access   Private
const addTransaction = asyncHandler(async (req, res) => {
  const {
    transaction: {
      expense: expenseId,
      description,
      payers,
      excludes,
      consumersNotPayer
    }
  } = req.body

  if (payers.length === 0) {
    throw new Error('At least one payer is required')
  }
  if (description === '') {
    throw new Error('Description is required')
  }
  if (description.length > 22) {
    throw new Error('Description is too long')
  }

  const user = await User.findById(req.user._id)
  const expense = user.expenses.find(t => t._id.toString() === expenseId)
  if (expense) {
    let { membersData } = expense
    const numberOfMembers = expense.membersData.length
    const numberOfExcludes = excludes.length

    if (numberOfExcludes == numberOfMembers) {
      throw new Error("All member's can't be excluded")
    }

    const numberOfConsumers = numberOfMembers - numberOfExcludes
    const totalAmount = payers.reduce(
      (acc, payer) => Number(payer.amount) + acc,
      0
    )
    if (totalAmount > 999999) {
      throw new Error(`It's too much amount for me to handle.`)
    }
    expense.totalExpense += totalAmount
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
        if (membersData[i].isUnmodified === true) {
          membersData[i].isUnmodified = false
        }
      } else if (isPayer && !isExcluded) {
        membersData[i].amount += payerAmount - shareAmount
        if (membersData[i].isUnmodified === true) {
          membersData[i].isUnmodified = false
        }
      } else if (!isPayer && !isExcluded) {
        membersData[i].amount -= shareAmount
        if (membersData[i].isUnmodified === true) {
          membersData[i].isUnmodified = false
        }
      } else {
        continue
      }
    }
    await user.save()

    const transaction = {
      user: req.user._id,
      expense: expense._id,
      totalAmount,
      description,
      numberOfConsumers,
      numberOfMembers,
      payers: [],
      excludes: [],
      consumersNotPayer
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
    throw new Error('Expense not found')
  }
})

// Method   PUT
// Route    api/transactions/:id
// Desc.    Mark transaction as trash & update user's amount
// Access   Private
const deleteTransaction = asyncHandler(async (req, res) => {
  const transactionId = req.params.id
  const user = await User.findById(req.user._id)
  const transaction = await Transaction.findById(transactionId)
  const expenseId = transaction.expense
  const expense = user.expenses.find(
    e => e._id.toString() === expenseId.toString()
  )
  if (transaction) {
    let { membersData } = expense

    const numberOfMembers = membersData.length
    const totalAmount = transaction.totalAmount
    expense.totalExpense -= totalAmount

    const shareAmount = (totalAmount / transaction.numberOfConsumers).toFixed(2)
    for (let i = 0; i < numberOfMembers; i++) {
      let isExcluded = false
      let isPayer = false
      let isPresent = false

      for (let j = 0; j < transaction.excludes.length; j++) {
        if (
          transaction.excludes[j].member.toString() ===
          membersData[i]._id.toString()
        ) {
          isPresent = true
          isExcluded = true
          break
        }
      }
      let payerAmount
      for (let j = 0; j < transaction.payers.length; j++) {
        if (
          transaction.payers[j].member.toString() ===
          membersData[i]._id.toString()
        ) {
          payerAmount = transaction.payers[j].amount
          isPresent = true
          isPayer = true
          break
        }
      }

      if (!isPresent) {
        isPresent = transaction.consumersNotPayer.find(
          c => membersData[i]._id.toString() === c.toString()
        )
      }

      if (isPresent) {
        if (isExcluded && isPayer) {
          membersData[i].amount -= payerAmount
        } else if (isPayer && !isExcluded) {
          membersData[i].amount -= payerAmount - Number(shareAmount)
        } else if (!isPayer && !isExcluded) {
          membersData[i].amount += Number(shareAmount)
        }
      }
    }
    await user.save()

    transaction.isTrash = true
    await transaction.save()

    res.status(201).json({ msg: 'Transaction moved to trash' })
  } else {
    res.status(404)
    throw new Error('Transaction not found')
  }
})

export {
  addTransaction,
  deleteTransaction,
  getAllTransactions,
  getLastTransactions,
  getTrashTransactions
}
