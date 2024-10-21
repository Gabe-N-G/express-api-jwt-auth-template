// controllers/users.js
const express = require('express');
const router = express.Router();
// Add bcrypt and the user model
const bcrypt = require('bcrypt');
const User = require('../models/user');

const SALT_LENGTH = 7 //adding shit to our hash to make it even harder.

router.post('/signup', async (req, res) => {
    try {
        // Set up for try
            // Check if the username is already taken
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (userInDatabase) {
            return res.status(400).json({error:'Username already taken.'});
        }    
            // Create a new user with hashed password
        const user = await User.create({
            username: req.body.username,
            hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH)
        })
        // if it works and we created a user
        res.status(201).json({ user });
    } catch (error) {
        // Set up for catch
        res.status(400).json({ error: error.message });
    }
});

module.exports = router