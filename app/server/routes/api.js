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
        res.status(200).send({token});
      }
    }
  });
});

router.get('/events', (req, res) => {
  let events = [
    {
      "id": "1",
      "name": "Auto Expo",
      "description": "Some text description",
      "date": "2019-04-23T18:25:43.511Z"
    },
    {
      "id": "2",
      "name": "Auto Expo",
      "description": "Some text description",
      "date": "2019-04-23T18:25:43.511Z"
    },
    {
      "id": "3",
      "name": "Auto Expo",
      "description": "Some text description",
      "date": "2019-04-23T18:25:43.511Z"
    },
    {
      "id": "4",
      "name": "Auto Expo",
      "description": "Some text description",
      "date": "2019-04-23T18:25:43.511Z"
    },
    {
      "id": "5",
      "name": "Auto Expo",
      "description": "Some text description",
      "date": "2019-04-23T18:25:43.511Z"
    },
    {
      "id": "6",
      "name": "Auto Expo",
      "description": "Some text description",
      "date": "2019-04-23T18:25:43.511Z"
    },
    {
      "id": "7",
      "name": "Auto Expo",
      "description": "Some text description",
      "date": "2019-04-23T18:25:43.511Z"
    }
  ];
  res.json(events);
});


router.get('/special', (req, res) => {
  let events = [
    {
      "id": "1",
      "name": "Auto Expo",
      "description": "Some text description",
      "date": "2019-04-23T18:25:43.511Z"
    },
    {
      "id": "2",
      "name": "Auto Expo",
      "description": "Some text description",
      "date": "2019-04-23T18:25:43.511Z"
    },
    {
      "id": "3",
      "name": "Auto Expo",
      "description": "Some text description",
      "date": "2019-04-23T18:25:43.511Z"
    },
    {
      "id": "4",
      "name": "Auto Expo",
      "description": "Some text description",
      "date": "2019-04-23T18:25:43.511Z"
    },
    {
      "id": "5",
      "name": "Auto Expo",
      "description": "Some text description",
      "date": "2019-04-23T18:25:43.511Z"
    },
    {
      "id": "6",
      "name": "Auto Expo",
      "description": "Some text description",
      "date": "2019-04-23T18:25:43.511Z"
    },
    {
      "id": "7",
      "name": "Auto Expo",
      "description": "Some text description",
      "date": "2019-04-23T18:25:43.511Z"
    }
  ];
  res.json(events);
});
module.exports = router;
