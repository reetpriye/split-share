import mongoose from 'mongoose'

const payerSchema = mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})

const excludeSchema = mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
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
    expense: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    description: {
      type: String
    },
    payers: [payerSchema],
    excludes: [excludeSchema]
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Transaction', transactionSchema)
