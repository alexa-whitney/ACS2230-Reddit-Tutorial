const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, select: false },
}, { timestamps: true });

module.exports = model('User', userSchema);