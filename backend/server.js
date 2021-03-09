import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import tripRoutes from './routes/tripRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'

dotenv.config()

const app = express()

// Connect to database
connectDB()

// Init Middleware
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.send('<h1>SplitShare</h1>')
})

// Define Routes
app.use('/api/users', userRoutes)
app.use('/api/trips', tripRoutes)
app.use('/api/transactions', transactionRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.port || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT: ${PORT}`.bgGray
      .bold
  )
)
