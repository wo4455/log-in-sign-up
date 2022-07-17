const express = require('express');
const mongoose = require('mongoose');
const path = require('node:path');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate, validatePassword } = require('../models/User');

const router = express.Router();

// Registering a new user
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    const { invalid } = validatePassword(req.body.password);
    if (invalid) return res.status(400).send(invalid.message);

    let user = await User.findOne({ email: req.body.email }); // add await
    if (user) return res.status(400).send("User already registered.");

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const salt = bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, parseInt(salt));

    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, [ '_id', 'name', 'email' ]));
});

module.exports = router;