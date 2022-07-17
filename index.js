const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const users = require('./routes/users');
const auth = require('./routes/auth');
const page = require('./routes/page');

const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error("FATAL ERROR: jwtPrivateKey is not defined.");
    process.exit(1);
    // exit process with code 1, error. 
}

// Startup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', page);
app.use('/register', users);
app.use('/auth', auth);

// Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

// MongoDB
mongoose.connect("mongodb://localhost:27017/Michael-Project")
  .then(() => console.log("Connected to DB.."))
  .catch(err => console.error("Error", err.message));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));