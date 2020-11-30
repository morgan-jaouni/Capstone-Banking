const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
	res.render('account/signup.ejs');
});

module.exports = router;