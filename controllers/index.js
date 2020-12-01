const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');
let userdata;
//Home Route
router.get('/', (req, res) => {
    res.render('index');
})


//Member Home Route
router.get('/member/home', (req, res) => {
    res.render('indexmember');
})


//Member Edit Route
router.get('/member/edit',(req, res, next) => {
    if(req.cookies.logged){
      const userid = req.cookies.logged;
      const query = User.findOne({ '_id' : userid });
      query.select('name username password email');
      query.exec((err, user) => {
      if (err) return console.log(err);
        res.render('memberedit', { userdata: user});
      });
    } 
  });
    

module.exports = router;