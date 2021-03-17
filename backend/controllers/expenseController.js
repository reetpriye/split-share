import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// Method   GET
// Route    api/expenses/
// Desc.    Get all user expenses
// Access   Private
const getUserExpenses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  res.send(user.expenses)
})

// Method   GET
// Route    api/expenses/:id/members
// Desc.    Get expense members
// Access   Private
const getExpenseMembers = asyncHandler(async (req, res) => {
  const expenseDetails = await User.findById(req.user._id).select({
    expenses: { $elemMatch: { _id: req.params.id } }
  })

  res.send(expenseDetails.expenses[0].membersData)
})

// Method   GET
// Route    api/expenses/:id
// Desc.    Get single expense details
// Access   Private
const getExpenseData = asyncHandler(async (req, res) => {
  const expenseDetails = await User.findById(req.user._id).select({
    expenses: { $elemMatch: { _id: req.params.id } }
  })

  res.json(expenseDetails.expenses[0])
})

// Method   POST
// Route    api/expenses/
// Desc.    Add new expense
// Access   Private
const addExpense = asyncHandler(async (req, res) => {
  const { expenseName } = req.body
  const user = await User.findById(req.user._id)
  user.expenses.push({ expenseName })
  await user.save()

  res.status(201).json({ msg: 'Expense added successfully' })
})

// Method   DELETE
// Route    api/expenses/:id
// Desc.    Delete existing expense
// Access   Private
const deleteExpense = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    user.expenses = user.expenses.filter(
      expense => expense._id.toString() !== req.params.id.toString()
    )

    await user.save()

    res.status(201).json({ msg: 'Expense deleted successfully' })
  } catch (err) {
    res.status(404)
    throw new Error('Expense not found')
  }
})

// Method   POST
// Route    api/expenses/:id/members/:memberId
// Desc.    Add new member
// Access   Private
const addMember = asyncHandler(async (req, res) => {
  const { name } = req.body
  if (!name) {
    res.status(400)
    throw new Error('Kindly provide a name')
  }

  const user = await User.findById(req.user._id)
  const expense = user.expenses.find(
    t => t._id.toString() === req.params.id.toString()
  )

  if (expense) {
    expense.membersData.push({ name })
    await user.save()

    res.status(201).json({ msg: 'Member added successfully' })
  } else {
    res.status(404)
    throw new Error('Expense not found')
  }
})

// Method   PUT
// Route    api/expenses/:id/members/:id
// Desc.    Update member details
// Access   Private
const updateMember = asyncHandler(async (req, res) => {
  const { name } = req.body
  if (!name) {
    res.status(400)
    throw new Error('Kindly provide a name')
  }

  const user = await User.findById(req.user._id)
  const expense = user.expenses.find(
    t => t._id.toString() === req.params.id.toString()
  )
  const member = expense.membersData.find(
    m => m._id.toString() === req.params.memberId.toString()
  )
  member.name = name
  await user.save()

  res.status(201).json({ msg: 'Member updated successfully' })
})

export {
  getExpenseData,
  getUserExpenses,
  getExpenseMembers,
  addExpense,
  deleteExpense,
  addMember,
  updateMember
}
