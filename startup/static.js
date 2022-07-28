const express = require('express');

module.exports = function(app) {
    app.use(express.static('public'));
    app.use('/css', express.static(__dirname + 'public/css'));
    app.use('/js', express.static(__dirname + 'public/js'));
    app.use('/img', express.static(__dirname + 'public/img'));
}