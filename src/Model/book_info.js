const mongoose = require('mongoose');

module.exports = () => {
  const bookSchema = new mongoose.Schema({
    book_name: {
      type: String,
      require: true,
    },
    author: [mongoose.ObjectId],
    price: {
      type: Number,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
  }, {
    versionKey: false,
  });

  return mongoose.models.book_info || mongoose.model('book_info', bookSchema);
};
