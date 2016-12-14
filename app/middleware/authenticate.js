import jwt from 'jsonwebtoken';
import Customer from '../models/customer';
import settings from '../config/settings';

export default function authenticate(req, res, next) {
  const {authorization} = req.headers;
  jwt.verify(authorization, settings.security.sessionSecret, (err, token) => {
    if (err) {
      return res.sendStatus(401);
    }

    // If token is decoded successfully, find user and attach to our request
    // for use in our route or other middleware
    Customer.findById(token._id)
      .then(customer => {
        if (!customer) {
          return res.sendStatus(401);
        }
        req.currentCustomer= customer
        next();
      })
      .catch((err) => next(err));
  });
}
