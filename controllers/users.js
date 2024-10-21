// controllers/users.js
const express = require('express');
const router = express.Router();
// Add bcrypt and the user model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken') //allows us to give tokens


const User = require('../models/user');

const SALT_LENGTH = 7 //adding shit to our hash to make it even harder.


//sign up without signing in.
// router.post('/signup', async (req, res) => {
//     try {
//         // Set up for try
//             // Check if the username is already taken
//         const userInDatabase = await User.findOne({ username: req.body.username });
//         if (userInDatabase) {
//             return res.status(400).json({error:'Username already taken.'});
//         }    
//             // Create a new user with hashed password
//         const user = await User.create({
//             username: req.body.username,
//             hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH)
//         })
//         // if it works and we created a user
//         res.status(201).json({ user });
//     } catch (error) {
//         // Set up for catch
//         res.status(400).json({ error: error.message });
//     }
// });

//sign up with signing in.
router.post('/signup', async (req, res) => {
    try {
      // Check if the username is already taken
      const userInDatabase = await User.findOne({ username: req.body.username });
      if (userInDatabase) {
        return res.json({ error: 'Username already taken.' });
      }
      // Create a new user with hashed password
      const user = await User.create({
        username: req.body.username,
        hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH),
      });
      const token = jwt.sign( // this part is new.
        { username: user.username, _id: user._id },
        process.env.JWT_SECRET
      );
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

router.post('/signin',async (req,res) =>{ // post because you're sending in information.
    try{
        const user  = await User.findOne({username: req.body.username}) //find user and see if the name matches the input
        if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)){ //hashes your password input and compares it to hashed password
            const token = jwt.sign(
                { username: user.username,
                    _id: user._id
                },
                process.env.JWT_SECRET //this is how you know this is a secret and it adds it to the hash.
            )
            res.status(200).json({token})
        } else {
            res.json({message: 'YOU SHALL NOT PASS'}) // IF NOT GET THE FUCK OUTTA HERE
        }
    } catch (error){
        res.status(400).json({error: error.message})
    }

})

module.exports = router