const express = require('express');
const router = express.Router();
const Tran = require('../models/Tran');




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
		res.redirect('/member')


		//find sender
		//update sender
		//save sender	
		
	})
})


module.exports = router;