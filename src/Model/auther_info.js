const mongoose = require('mongoose');

module.exports = () => {
  const autherSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
  }, {
    versionKey: false,
  });

  return mongoose.models.auther_info || mongoose.model('auther_info', autherSchema);
};
