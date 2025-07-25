import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import httpsRedirect from 'express-https-redirect'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import expenseRoutes from './routes/expenseRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'

dotenv.config()

const app = express()

if(process.env.NODE_ENV === 'production') {
    app.use('/', httpsRedirect())
}

// Connect to database
connectDB()

// Init Middleware
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Define Routes
app.use('/api/users', userRoutes)
app.use('/api/expenses', expenseRoutes)
app.use('/api/transactions', transactionRoutes)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT: ${PORT}`.bgGray
      .bold
  )
)
