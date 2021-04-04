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
    isTrash: {
      type: Boolean,
      default: false
    },
    numberOfConsumers: {
      type: Number,
      required: true
    },
    numberOfMembers: {
      type: Number,
      required: true
    },
    payers: [payerSchema],
    excludes: [excludeSchema],
    consumersNotPayer: [mongoose.Schema.Types.ObjectId]
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Transaction', transactionSchema)
