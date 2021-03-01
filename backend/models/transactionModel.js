import mongoose from 'mongoose'

const transactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    amount: {
      type: Number,
      required: true,
      default: 0
    },
    description: {
      type: String,
      default: 'NA'
    },
    payer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Member'
    },
    exclude: [mongoose.Schema.Types.ObjectId]
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Transaction', transactionSchema)
