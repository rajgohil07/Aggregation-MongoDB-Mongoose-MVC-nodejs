const book_info = require('../Model/book_info')();
const auther_info = require('../Model/auther_info')();

// to insert the auther
exports.insertAuther = async (req, res) => {
  // body data
  const data = {
    name: req.body.name,
    email: req.body.email,
    country: req.body.country,
    age: req.body.age,
  };

  const result = await auther_info.create(data);
  res.send({ message: 'Author data inserted successfully', result });
};

// to insert book
exports.insertBook = async (req, res) => {
  // body data
  const data = {
    book_name: req.body.book_name,
    price: req.body.price,
    quantity: req.body.quantity,
  };

  const result = await book_info.create(data);
  res.send({ message: 'Book data inserted successfully', result });
};

// to insert Auther To Book
exports.insertAutherToBook = async (req, res) => {
  const book_id = req.params.id;

  const auther_arr = req.body.data;

  const result = await book_info.findByIdAndUpdate(book_id, {
    $push: { author: { $each: auther_arr } },
  }, { new: true });

  res.send({ message: `new auther has been added to the book ${result.book_name}`, updated_data: result });
};
