import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

import usersRoutes from './routes/usersRoutes.js'
import authRoutes from './routes/authRoutes.js'
import dataRoutes from './routes/dataRoutes.js'

dotenv.config()

const app = express()

// Connect to database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
  res.send('<h1>SplitShare</h1>')
})

// Define Routes
app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/data', dataRoutes)

const PORT = process.env.port || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT: ${PORT}`.bgGray
      .bold
  )
)
