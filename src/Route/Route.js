module.exports = (app) => {
    require('./InsertRoute')(app);
    require('./InformationRoute')(app);
    require('./DeleteRoute')(app);
    require('./AdditionalRoute')(app);
};