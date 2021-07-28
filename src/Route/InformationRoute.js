module.exports = (app) => {

    const ValidateToken = require("../Middleware/VerifyToken").verifyToken;
    const InformationController = require("../Controller/InformationController");

    //display book with auther
    app.get("/getAuthersWithBook", ValidateToken, InformationController.getAuthersWithBook);

    //display specefic auther book_info
    app.get('/autherInfo/:id', ValidateToken, InformationController.autherInfo);

    //display most sold book
    app.get("/mostSoldBook", ValidateToken, InformationController.mostSoldBook);

    //dsplay total profit
    app.get("/displayProfit", ValidateToken, InformationController.displayProfit);

    //display entire project profit
    app.get("/totalProjectProfit", ValidateToken, InformationController.totalProjectProfit);

};