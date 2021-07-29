const AdditionalController = require('../Controller/AdditionalController');
const Helper = require('../Helper/Helper');

module.exports = (app) => {
  // generate token
  app.get('/generateToken', Helper.generateToken);

  // if invalid url passed
  app.get('*', AdditionalController.NotFound);
};
