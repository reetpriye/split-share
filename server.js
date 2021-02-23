const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('<h1>SplitShare</h1>');
});

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/data', require('./routes/data'));

const PORT = process.env.port || 5000;

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
