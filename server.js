const express = require('express');
const app = express();
const accountController= require('./controllers/account.js')
const PORT = process.env.PORT || 3000;

app.use('/account', accountController);


// Controller



// View Engine
app.set('view engine', 'ejs');


//Home Route
app.get('/', (req,res) => {

    res.render('index.ejs');

})

//Account Show
app.get('/account', (req,res) => {

    res.render('./account/index.ejs');

})

//Transfer Route
app.get('/transfer', (req,res) => {

    res.render('./transfer/index.ejs');

})

//Signup
app.get('/signup', (req,res) => {

    res.render('./account/signup.ejs');

})


app.listen(PORT,() => {

    console.log(`Server running on port ${PORT}`);

});