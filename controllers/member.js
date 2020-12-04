const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Tran = require('../models/Tran');
const mongoose = require('mongoose');
let userdata;
let trandata;

//Member Page
router.get('/',(req, res) => {
  if(req.cookies.logged){
    const userid = req.cookies.logged;
    const query = User.findOne({ '_id' : userid });
    const query2 = Tran.find({sender: userid})
    query.select('name username email money create_date');
    query2.select('sender receiver amount');
    query2.populate('receiver', 'username')
    query2.populate('sender', 'username')
    query.exec((err, user) => {
      if (err) return console.log(err);
      query2.exec((err,tran) => {
        if (err) return console.log(err);
       
          res.render('member',{trans : tran, userdata: user });
        });
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