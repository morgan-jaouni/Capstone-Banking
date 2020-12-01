const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');


/* Get login page. */
router.get('/', function(req, res, next) {
        res.render('login');
  });


  /* Proccess Login */
router.post('/', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const query = User.findOne({ 'username': username, 'password':password });
    query.select('id username password');
    query.exec(function (err, user) {
    if (err) return console.log(err);
        res.cookie('logged',user.id);
        res.redirect('/member');
    });
  });



  module.exports = router;