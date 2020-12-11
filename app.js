const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/key');
const passport = require('passport');
const app = express();


// set view engine
app.set('view engine', 'ejs');

// routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

app.use(cookieSession({
	maxAge:24 * 60 * 60 * 1000,
	keys:[keys.session.cookieKey]
}));

//set passport session init
app.use(passport.initialize());
app.use(passport.session());

// create home route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});