const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    }
});

userSchema.methods.generateAuthToken() = function() {
    const token = jwt.sign({ _id: this._id, email: this.email }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    });

    return schema.validate(user);
}

function validatePassword(password) {
    const complexityOptions = {
      min: 10,
      max: 30,
      lowercase: 1,
      uppercase: 1,
      numberic: 1,
      requirementCount: 2
    }
  
    return passwordComplexity(complexityOptions).validate(password);

}

exports.User = User;
exports.validate = validate;
exports.validatePassword = validatePassword;