// controllers/test-jwt.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.get('/sign-token', (req, res) => {
  const user = {
    _id: 1,
    username: "FakeHuman",
    password: 12345
  }
  const token = jwt.sign({user}, process.env.JWT_SECRET)
  res.json({token})
});

router.post('/verify-token', (req,res) =>{
    const token = req.headers.authorization.split(' ')[1];  // removes the word bearer, does this by going to the second or:[1] string seperated by a space
    res.json({ token });
})

module.exports = router;
