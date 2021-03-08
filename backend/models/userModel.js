import mongoose from 'mongoose'
import tripSchema from './tripModel.js'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    currTripId: {
      type: mongoose.Schema.Types.ObjectId
    },
    trips: [tripSchema]
  },
  {
    timestamps: true
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// userSchema.pre('save', async function () {
//   const salt = await bcrypt.genSalt(10)
//   this.password = await bcrypt.hash(this.password, salt)
// })

export default mongoose.model('User', userSchema)
