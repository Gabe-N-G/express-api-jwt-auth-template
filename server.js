const dotenv = require('dotenv');
dotenv.config();

//alt: require('dotenv').config

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const testJWTRouter = require('./controllers/test-jwt');


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
app.use('/test-jwt', testJWTRouter);


// Routes go here

app.listen(3000, () => {
  console.log('The express app is ready!');
});
