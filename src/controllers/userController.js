const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const { username } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newUser = new User({ username });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '_id username');
        res.status(200).json(users);
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
