const Joi = require('joi');

exports.validateAuther = (req, res, cb) => {
  const SchemaAuther = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    country: Joi.string().required(),
    age: Joi.number().integer().required(),
  });

  const Auther = {
    name: req.body.name,
    email: req.body.email,
    country: req.body.country,
    age: req.body.age,
  };

  const result = SchemaAuther.validate(Auther);
  result.error ? res.send({ message: result.error.details[0].message }) : cb();
};

exports.validateBook = (req, res, cb) => {
  const SchemaBook = Joi.object({
    book_name: Joi.string().min(3).required(),
    price: Joi.number().required(),
    quantity: Joi.number().integer().required(),
  });

  const Book = {
    book_name: req.body.book_name,
    price: req.body.price,
    quantity: req.body.quantity,
  };

  const result = SchemaBook.validate(Book);
  result.error ? res.send({ message: result.error.details[0].message }) : cb();
};

exports.validateArray = (req, res, cb) => {
  const SchemaArray = Joi.object({
    data: Joi.array().items(Joi.string()).required(),
  });

  const arrayCheck = {
    data: req.body.data,
  };

  const result = SchemaArray.validate(arrayCheck);
  result.error ? res.send({ message: result.error.details[0].message }) : cb();
};
