const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const userRoute = require('./routes/userRoutes');

app.use('/api', userRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
