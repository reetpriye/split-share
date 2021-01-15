const express = require('express');
const app = express();

const PORT = process.env.port || 5000;

app.get('/', (req, res) => {
  res.send('<h1>SplitShare</h1>');
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
