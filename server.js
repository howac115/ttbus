const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const user = require('./routes/user');
// const schedule = require('./routes/schedule');
// const interest = require('./routes/interest');

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());

// Bodyparser Middleware
app.use(bodyParser.json());

// Database config
const db = require('./config/keys').mongoURL;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));

// Use Routes
app.use('/user', user);
// app.use('/schedule', schedule);
// app.use('/interest', interest);


app.listen(port, () => console.log(`Server started on port ${port}`));


module.exports = app;
