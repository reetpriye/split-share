/*
WARNING: Be very careful, this will delete all the
data present in the database and add new sample data
for development purpose.
*/

import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import users from './data/users.js'
import User from './models/userModel.js'
import transactions from './data/trasactions.js'
import Transaction from './models/transactionModel.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Transaction.deleteMany()

    // const createdUsers = await User.insertMany(users)

    // const userids = createdUsers.map(user => user._id)
    // const memberids = createdUsers[0].trips[0].membersData.map(
    //   member => member._id
    // )
    // const tripId = createdUsers[0].trips[0]._id
    // const rajId = memberids[0]
    // const manishId = memberids[1]
    // const ankitId = memberids[2]
    // const reetId = memberids[3]
    // const ashishId = memberids[4]

    // transactions[0].trip = tripId
    // transactions[1].trip = tripId
    // transactions[2].trip = tripId
    // transactions[3].trip = tripId

    // transactions[0].payers = [{ member: ashishId, amount: 50 }]
    // transactions[1].payers = [
    //   { member: reetId, amount: 60 },
    //   { member: ankitId, amount: 40 }
    // ]
    // transactions[2].payer = [
    //   { member: rajId, amount: 200 },
    //   { member: manishId, amount: 40 }
    // ]
    // transactions[3].payer = [
    //   { member: ashishId, amount: 40 },
    //   { member: manishId, amount: 90 },
    //   { member: reetId, amount: 20 }
    // ]

    // transactions[2].excludes = [reetId]
    // transactions[3].excludes = [ankitId, rajId]

    // const updatedTransactions = transactions.map(transaction => {
    //   return {
    //     ...transaction,
    //     user: userids[0]
    //   }
    // })

    // await Transaction.insertMany(updatedTransactions)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    await Transaction.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
