const mongoose = require('mongoose');
const joi = require('joi')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



const validateUser = (user) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
  })

  return schema.validate(user)
}

const User = mongoose.model('User', userSchema);

User.createIndexes()

module.exports = {User, validateUser};
