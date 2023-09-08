const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();


const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTERNAME}/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose
    .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error)=>{
        console.error('Error connecting to MongoDB Atlas:', error);
    });


    
    