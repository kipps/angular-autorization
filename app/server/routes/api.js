const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');

const db = 'mongodb+srv://admin:kipps87@cluster0-x142m.gcp.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(db, err => {
  if (err) {
    console.error(`Error ${err}`);
  } else {
    console.log('Connected to mongodb');
  }
});


// This methods need for verify token between server and browser
function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    return res.status(401).send('Unauthorized request');
  }
  let payload = jwt.verify(token, 'secretKey');
  if (!payload) {
    return res.status(401).send('Unauthorized request');
  }
  req.userId = payload.subject;
  next();
}

router.get('/', (req, res) => {
  res.send('From API route');
});

router.post('/register', (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((error, registerUser) => {
    if (error) {
      console.error(error);
    } else {
      let payload = {subject: registerUser._id};
      let token = jwt.sign(payload, 'secretKey');
      res.status(200).send({token});
    }
  });
});

router.post('/login', (req, res) => {
  let userData = req.body;
  User.findOne({email: userData.email}, (error, user) => {
    if (error) {
      console.error(error);
    } else {
      if (!user) {
        res.status(401).send('Invalid Email');
      } else if (user.password !== userData.password) {
        res.status(401).send('Invalid Password');
      } else {
        let payload = {subject: user._id};
        let token = jwt.sign(payload, 'secretKey');
        res.status(200).send({token, user});
      }
    }
  });
});

// Those methods need for GET list of users from db

router.get('/welcome', (req, res) => {
  mongoose.model('user').find(function (err, users) {
    res.send(users);
  })
});


router.get('/admin', verifyToken, (req, res) => {
  mongoose.model('user').find(function (err, users) {
    res.send(users);
  })
});
module.exports = router;
