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
    
      res.render('member', { userdata: user});
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



					
// PUT edit
router.put('/:id/edit', (req, res) => {

  //query db
  User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, updatedUser) => {
          if (err) return console.log(err);
          res.redirect('/member/edit');
      }
  );
});


//PUT User Delete 
router.delete('/:id', (req,res) => {
  
  //query db
  User.findByIdAndDelete(req.params.id, (err, deleteUser) => {
    if (err) return console.log(err);

    //redirect to users index
    res.redirect('/register');

  }); 
});


//member withdraw
router.put('/:id/withdraw', (req,res) => {

  //query db
  User.findOne({'_id' : req.params.id}, (err, foundUser)=>{

    const newBalance = foundUser.money - req.body.withdraw;
    
    User.findByIdAndUpdate({'_id' : req.params.id}, { $set: {money : newBalance}}, (err, foundUser)=>{
      res.redirect('/member')
    });
  });
});


//member deposit
router.put('/:id/deposit', (req,res) => {

  //query db
  User.findOne({'_id' : req.params.id}, (err, foundUser)=>{

    const newBalance = foundUser.money + parseInt(req.body.deposit);
    
    User.findByIdAndUpdate({'_id' : req.params.id}, { $set: {money : newBalance}}, (err, foundUser)=>{
      res.redirect('/member')
    });
  });
});

module.exports = router;