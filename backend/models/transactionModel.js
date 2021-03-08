import mongoose from 'mongoose'

const payerSchema = mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Member'
  },
  amount: {
    type: Number,
    required: true
  }
})

const transactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    totalAmount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      default: 'NA'
    },
    payer: [payerSchema],
    exclude: [mongoose.Schema.Types.ObjectId]
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Transaction', transactionSchema)
