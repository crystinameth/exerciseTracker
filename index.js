const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTERNAME}/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose
    .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('Connected to MongoDB Atlas');

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        const userRoutes = require('./src/routes/userRoutes');
        const exerciseRoutes = require('./src/routes/exerciseRoutes');

        app.use('/api/users', userRoutes);
        app.use('/api/exercises', exerciseRoutes);

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error)=>{
        console.error('Error connecting to MongoDB Atlas:', error);
    });


    
    