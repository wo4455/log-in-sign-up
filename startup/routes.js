const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const page = require('../routes/page');
const main = require('../routes/main');
const error = require('../middleware/error');
const test = require('../routes/test');
const cookieParser = require('cookie-parser');

module.exports = function(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cookieParser());

    app.use('/', page);
    app.use('/register', users);
    app.use('/auth', auth);
    app.use('/main', main);
    app.use('/test', test);
    
    app.use(error); // must be last
}