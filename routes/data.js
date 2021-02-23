const express = require('express');
const router = express.Router();

// Method   GET
// Route    api/data
// Desc.    Get all member's data
// Access   Private
router.get('/', (req, res) => {
  res.send("Get all member's data");
});

// Method   POST
// Route    api/data
// Desc.    Update Member Data
// Access   Public
router.post('/', (req, res) => {
  res.send('Update Member Data');
});

module.exports = router;
