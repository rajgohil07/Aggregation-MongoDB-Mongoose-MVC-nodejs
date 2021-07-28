module.exports = (app) => {

    const MiddleWare = require("../Middleware/Validator");
    const ValidateToken = require("../Middleware/VerifyToken").verifyToken;
    const DeleteController = require("../Controller/DeleteController");

    //to drop specfic auther
    app.delete('/deleteAuther/:id', ValidateToken, DeleteController.deleteAuther);

    //to drop specfic book
    app.delete('/deleteBook/:id', ValidateToken, DeleteController.deleteBook);

    //to drop entire collections
    app.delete('/deleteAllData', ValidateToken, DeleteController.deleteAllData);

    //remove auther to book
    app.put('/removeAtherToBook/:id', ValidateToken, MiddleWare.validateArray, DeleteController.removeAtherToBook);

};