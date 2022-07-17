const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { User } = require('../models/User');
const { valid } = require('joi');

const router = express.Router();

// Logging in a user
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send("Error", error.message);

    // Make sure there is a user with the email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    // Validating password
    const validPassword = bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid email or password");

    const token = user.generateAuthToken();
    res.header('x-auth-token', token)
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    });

    return schema.validate(req);
}

module.exports = router;