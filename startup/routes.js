const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const page = require('../routes/page');
const error = require('../middleware/error');
const helmet = require('helmet');

module.exports = function(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet());

    app.use('/', page);
    app.use('/register', users);
    app.use('/auth', auth);
    
    app.use(error); // must be last
}