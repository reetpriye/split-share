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

const tripSchema = mongoose.Schema(
  {
    tripName: {
      type: String,
      required: true,
      default: 'Not saved'
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

export default tripSchema
