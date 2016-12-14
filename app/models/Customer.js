import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import LoanSummary from './LoanSummary';
import settings from '../config/settings';

const authTypes = ['github', 'twitter', 'facebook', 'google'];

const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
  firstname: String,
  lastname: String,
  username: {
    type: String,
    unique: true,
    required: [true, 'Customername is required.']
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Email is required'],
    validate: {
      validator(email) {
        const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
        return emailRegex.test(email);
      },
      message: '{VALUE} is not a valid email.'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required.']
  },
  role: {
    type: String,
    default: 'user'
  }
}, {
  timestamps: true
});

// Strip out password field when sending user object to client
CustomerSchema.set('toJSON', {
  virtuals: true,
  transform(doc, obj) {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    delete obj.password;
    return obj;
  }
});

// Ensure email has not been taken
CustomerSchema
  .path('email')
  .validate((email, respond) => {
    CustomerModel.findOne({email})
      .then(user => { respond(user ? false : true) })
      .catch(() => { respond(false) });
  }, 'Email already in use.');

// Validate username is not taken
CustomerSchema
  .path('username')
  .validate((username, respond) => {
    CustomerModel.findOne({username})
      .then(user => { respond(user ? false : true) })
      .catch(() => { respond(false) });
  }, 'Customername already taken.');

// Validate password field
CustomerSchema
  .path('password')
  .validate(function (password) {
    if (~authTypes.indexOf(this.provider)) {
      return true;
    }

    return password.length >= 6 && password.match(/\d+/g);
  }, 'Password be at least 6 characters long and contain 1 number.');

//
CustomerSchema
  .pre('save', function (done) {
    // Encrypt password before saving the document
    if (this.isModified('password')) {
      this._hashPassword(this.password, Constants.security.saltRounds, (err, hash) => {
        this.password = hash;
        done();
      })
    } else {
      done();
    }
  });

/**
 * Customer Methods
 */
CustomerSchema.methods = {
  getLoanSummaries() {
    return LoanSummary.find({ _user: this._id });
  },

  /**
   * Authenticate - check if the passwords are the same
   * @public
   * @param {String} password
   * @return {Boolean} passwords match
   */
  authenticate(password) {
    return bcrypt.compareSync(password, this.password);
  },

  /**
   * Generates a JSON Web token used for route authentication
   * @public
   * @return {String} signed JSON web token
   */
  generateToken() {
    return jwt.sign({ _id: this._id }, Constants.security.sessionSecret, {
      expiresIn: Constants.security.sessionExpiration
    });
  },

  /**
   * Create password hash
   * @private
   * @param {String} password
   * @return {Boolean} passwords match
   */
  _hashPassword(password, saltRounds = Constants.security.saltRounds, callback) {
    return bcrypt.hash(password, saltRounds, callback)
  }
};

const CustomerModel = mongoose.model('Customer', CustomerSchema);

export default CustomerModel;