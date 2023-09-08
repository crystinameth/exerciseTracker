const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');

dotenv.config();

/*  Connection error using env */

const connectionString = 'mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xh1rgwr.mongodb.net/${process.env.DB_NAME}'

mongoose
    .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error)=>{
        console.error('Error connecting to MongoDB Atlas:', error);
    });


    
    