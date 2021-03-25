/*
WARNING: Be very careful, this will delete all the
data present in the database and add new sample data
for development purpose.
*/

import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import User from './models/userModel.js'
import Transaction from './models/transactionModel.js'

dotenv.config()

connectDB()

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
}
