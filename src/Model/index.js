/* eslint-disable no-console */
module.exports = (mongoose) => {
  // to connect
  mongoose.connect(process.env.MONGOOES_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }, (err) => (err
    ? console.log('Enable to connect to the database due to:', err)
    : console.log('MongoDB connection sucessfull!')));
};
