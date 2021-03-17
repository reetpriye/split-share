import mongoose from 'mongoose'

const memberDataSchema = mongoose.Schema(
  {
    name: {
      type: String
    },
    amount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

const expenseSchema = mongoose.Schema(
  {
    expenseName: {
      type: String,
      required: true
    },
    totalExpense: {
      type: Number,
      default: 0
    },
    membersData: [memberDataSchema]
  },
  {
    timestamps: true
  }
)

export default expenseSchema
