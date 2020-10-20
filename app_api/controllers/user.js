const { Mongoose } = require("mongoose");
const mongoose = require('mongoose');
const user = Mongoose.model('User');

user.name = "User's name";
user.email = "test@example.com";
user.setPassword("myPassword");
user.save();