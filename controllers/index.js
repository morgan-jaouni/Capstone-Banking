const express = require('express');
const router = express.Router();

//Home Route
router.get('/', (req, res, next) => {
    res.render('index');
})


//Member Home Route
router.get('/member/home', (req, res, next) => {
    res.send(req.oidc.isAuthenticated() ? res.render('indexmember') : res.render('index') ); 
})

module.exports = router;