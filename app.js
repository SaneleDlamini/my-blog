const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log('DB connected successfully');
}).catch(err => console.log(err));


//Middleware
app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'back-end/public/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/users', require('./back-end/routes/user-router.js'));
app.use('/api', require('./back-end/routes/post-router.js'));


app.listen(process.env.PORT, () => {
  console.log('Server running on 6000');
})