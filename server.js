const express = require('express');
const app = express();
const accountController= require('./controllers/account.js')


app.use('/account', accountController);

app.get('/', (req,res) => {

    res.render('index.ejs');

})
app.get('/account', (req,res) => {

    res.render('./account/index.ejs');

})
app.get('/transfer', (req,res) => {

    res.render('./transfer/index.ejs');

})


app.listen(3000,() => {

    console.log('listening');

});