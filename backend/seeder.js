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

    const createdUsers = await User.insertMany(users)
    const userids = createdUsers.map(user => user._id)
    const memberids = createdUsers[0].trips[0].membersData.map(
      member => member._id
    )

    const rajId = memberids[0]
    const manishId = memberids[1]
    const ankitId = memberids[2]
    const reetId = memberids[3]
    const ashishId = memberids[4]

    transactions[0].payer = ashishId
    transactions[1].payer = ashishId
    transactions[2].payer = rajId
    transactions[3].payer = rajId
    transactions[4].payer = manishId
    transactions[5].payer = ankitId

    transactions[3].exclude = [ashishId, reetId]
    transactions[5].exclude = [ashishId]

    const updatedTransactions = transactions.map(transaction => {
      return {
        ...transaction,
        user: userids[0]
      }
    })

    await Transaction.insertMany(updatedTransactions)

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
