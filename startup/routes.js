const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const page = require('../routes/page');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/', page);
    app.use('/register', users);
    app.use('/auth', auth);
    
    app.use(error);
}