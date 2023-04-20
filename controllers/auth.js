const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
  // RENDER SIGN UP FORM
  app.get('/sign-up', (req, res) => res.render('sign-up'));

  // SIGN UP POST
  app.post('/sign-up', async (req, res) => {
    try {
      // Create User and JWT
      const user = new User(req.body);
      await user.save();
      const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      return res.redirect('/');
    } catch (err) {
      console.log(err.message);
      return res.status(400).send({ err });
    }
  });
};
