const MiddleWare = require('../Middleware/Validator');
const ValidateToken = require('../Middleware/VerifyToken').verifyToken;
const InsertController = require('../Controller/InsertController');

module.exports = (app) => {
  // insert Auther
  app.post('/insertAuther', ValidateToken, MiddleWare.validateAuther, InsertController.insertAuther);

  // insert Book
  app.post('/insertBook', ValidateToken, MiddleWare.validateBook, InsertController.insertBook);

  // insert auther to book
  app.put('/insertAutherToBook/:id', ValidateToken, MiddleWare.validateArray, InsertController.insertAutherToBook);
};
