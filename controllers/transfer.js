const express = require('express');
const router = express.Router();
const Tran = require('../models/Tran');
const User = require('../models/User');




router.get('/', (req, res)=>{
	res.render('transfer.ejs');
});


router.post('/:sender', (req,res) => {
	
	const send = {
		sender : req.params.sender,
		receiver : req.body.receiver, 
		amount : parseInt(req.body.amount)
		}
	Tran.create(send, (err, newTran) => {
		if (err) return console.log(err);

		//find sender
		User.findById(req.params.sender, (err, foundUser)=>{
			const updateSenderBalance = foundUser.money - req.body.amount

		//update sender
		User.findByIdAndUpdate(req.params.sender, { $set: {money : updateSenderBalance}}, (err, foundUser)=>{
			
		//find receiver
		User.findById(req.body.receiver, (err, foundUser)=>{	
			const updateReceiverBalance = foundUser.money + parseInt(req.body.amount)	

		//update receiver
		User.findByIdAndUpdate(req.body.receiver, { $set: {money : updateReceiverBalance}}, (err, foundUser)=>{
			
		res.redirect('/member')

		})
		})
		})
	 })
	})
})


module.exports = router;