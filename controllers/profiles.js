// controllers/profiles.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

//adding verify token here
const verifyToken =  require('../middleware/verify-token')

router.get('/:userId', verifyToken, async (req, res) => { //adding middleware literally in the middle here. 
  try {
    const user = await User.findById(req.params.userId); // try to find a user!
    if (!user) {
      res.status(404); //user not found is a 404
      throw new Error('Profile not found.'); // throw makes the error trip. or else this would just return null
    }
    res.json({ user });
  } catch (error) {
    if (res.statusCode === 404) {
      res.status(404).json({ error: error.message });//404: not found 
    } else {
      res.status(500).json({ error: error.message });//500: internal server error
    }
  }
});

module.exports = router;
