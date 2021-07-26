module.exports = (app) => {

    const MiddleWare = require("../Middleware/validator");

    const Controller = require("../Controller/Controller");

    //insert Auther
    app.post('/insertAuther', MiddleWare.validateAuther, Controller.insertAuther);

    //insert Book
    app.post('/insertBook', MiddleWare.validateBook, Controller.insertBook);

    //insert auther to book
    app.put('/insertAutherToBook/:id', MiddleWare.validateArray, Controller.insertAutherToBook);

    //remove auther to book
    app.put('/removeAtherToBook/:id', MiddleWare.validateArray, Controller.removeAtherToBook);

    //display book with auther
    app.get("/getAuthersWithBook", Controller.getAuthersWithBook);

    //display specefic auther book_info
    app.get('/autherInfo/:id', Controller.autherInfo);

    //dsplay total profit
    app.get("/displayProfit", Controller.displayProfit);

    //display entire project profit
    app.get("/totalProjectProfit", Controller.totalProjectProfit);

    //to drop specfic auther
    app.delete('/deleteAuther/:id', Controller.deleteAuther);

    //to drop specfic book
    app.delete('/deleteBook/:id', Controller.deleteBook);

    //to drop entire collections
    app.delete('/deleteAllData', Controller.deleteAllData);

    //if invalid url passed
    app.get('*', Controller.NotFound);

};