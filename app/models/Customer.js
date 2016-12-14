import mongoose from 'mongoose';

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
    required: [
      true, 'Email is required'
    ],
    validate: {
      validator(email) {
        const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
        return emailRegex.test(email);
      },
      message: '{VALUE} is not a valid email.'
    }
  }
}, {timestamps: true});

const CustomerModel = mongoose.model('Customer', CustomerSchema);

export default CustomerModel;