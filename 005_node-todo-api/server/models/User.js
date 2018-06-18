const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { pick } = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email.`
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// toJSON override method, determines what gets sent back when a mongoose model is converted into a JSON value

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  return pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({ _id: user._id, access }, 'abc123').toString();
  user.tokens = user.tokens.concat([{ access, token }]);

  return user.save().then(() => token);
};

UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

// login

UserSchema.statics.findByCredentials = function(email, password) {
  const User = this;
  return User.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

// attach event before the model gets saved to the db
UserSchema.pre('save', function(next) {
  const user = this;
  // use method available on instance called `.isModified`, which takes an individual property like `password` and returns true or false
  // if the password is modified, hash the password, else call `next()`
  if (user.isModified('password')) {
    // user.password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        // user.password = hash
        user.password = hash;
        // next()
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
