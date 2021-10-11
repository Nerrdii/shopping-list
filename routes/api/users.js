const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

/**
  @route  POST /api/users
  @desc   Register new user
  @access Public
*/
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  const newUser = new User({ name, email, password });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      throw err;
    }

    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if (err) {
        throw err;
      }

      newUser.password = hash;

      const user = await newUser.save();
      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) {
            throw err;
          }

          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

module.exports = router;
