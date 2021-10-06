//bring what we need first
const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express();

//DB Config
const db = require('./config/keys').mongoURI

//Connect to Mongodb
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err))

app.get('/', (req, res) => res.send('Hello, World!'));

//Use Routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));