const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Import routes
const userRoutes = require('./routes/userRoutes');

// Use routes with prefix /users
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
