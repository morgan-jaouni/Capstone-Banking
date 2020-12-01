const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');

router.get('/', function(req, res, next) {
	
		res.render('register');
	
});

router.post('/', (req, res, next) => {
	const user = new User({
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
	});
  
	user.save(() => {
		res.render('login');
	});
  });
  
module.exports = router;