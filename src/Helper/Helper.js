const jwt = require('jsonwebtoken');
require('dotenv').config();

const token_time = 600;

exports.generateToken = (req, res) => {
  const token = jwt.sign({ valid: true }, process.env.JWT_SECRET_KEY, { expiresIn: token_time });

  res.send({
    message: 'Your token is generated sucessfully!',
    'Time expiry': `Valid for ${token_time / 60} Minutes`,
    token,
  });
};
