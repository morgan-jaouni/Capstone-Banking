const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');
let userdata;

//Member Page
router.get('/',(req, res, next) => {
  if(req.cookies.logged){
    const userid = req.cookies.logged;
    const query = User.findOne({ '_id' : userid });
    query.select('name username email money create_date');
    query.exec((err, user) => {
    if (err) return console.log(err);
      userdata=user;
      res.render('member', { userdata: user, title: 'member', action:'MAIN' });
    });
  } else {
    res.redirect('/login');
  }
});

//logout
router.get('/logout', (req, res, next) => {
  res.clearCookie("logged");
  res.redirect('/login');
});


module.exports = router;