//------Configuration

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const redirect = require('express-redirect');
const PORT = process.env.PORT || 3000;
redirect(app);

const index = require('./controllers/index');
const auth = require('./controllers/auth');
const register = require('./controllers/register');
const member = require('./controllers/member');
const transfer = require('./controllers/transfer');

// Database
const db = require('./models');


// View Engine
app.set('view engine', 'ejs');

// Static Files
app.use(express.static(__dirname + '/public'));

//Middleware

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//method-override
app.use(methodOverride('_method'));
// Morgan
app.use(morgan(':method : url'));
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/', index);
app.use('/login',auth);
app.use('/register',register);
app.use('/member',member); 
app.use('/transfer',transfer); 


app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;