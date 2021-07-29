const InsertRoute = require('./InsertRoute');
const InformationRoute = require('./InformationRoute');
const DeleteRoute = require('./DeleteRoute');
const AdditionalRoute = require('./AdditionalRoute');

module.exports = (app) => {
  // call all route to one file
  InsertRoute(app);
  InformationRoute(app);
  DeleteRoute(app);
  AdditionalRoute(app);
};
