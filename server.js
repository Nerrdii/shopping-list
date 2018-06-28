const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = require('./config/keys').mongoURI;
const items = require('./routes/api/items');

const app = express();

app.use(bodyParser.json());
app.use('/api/items', items);

mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App now listening on port ${PORT}...`));
