import mongoose from 'mongoose'

const memberDataSchema = mongoose.Schema(
  {
    name: {
      type: String
    },
    amount: {
      type: Number,
      default: 0
    },
    isUnmodified: {
      type: Boolean,
      default: true
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
