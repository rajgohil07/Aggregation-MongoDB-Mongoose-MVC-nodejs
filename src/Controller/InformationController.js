const mongoose = require("mongoose");
const book_info = require("../Model/book_info")();
const auther_info = require("../Model/auther_info")();

//display book with auther
exports.getAuthersWithBook = async (req, res) => {

    const result = await auther_info.aggregate([{
        '$lookup': {
            'from': 'book_infos',
            'localField': '_id',
            'foreignField': 'author',
            'as': 'string'
        }
    }, {
        '$project': {
            '_id': 0,
            'Author': '$name',
            'email': '$email',
            'country': '$country',
            'age': '$age',
            'Book_name': '$string.book_name'
        }
    }]);

    res.send({ "message": " all data associated with authors", result });
};

//display most sold book
exports.mostSoldBook = async (req, res) => {

    const result = await book_info.aggregate([{
        '$lookup': {
            'from': 'auther_infos',
            'localField': 'author',
            'foreignField': '_id',
            'as': 'string'
        }
    }, {
        '$project': {
            '_id': 0,
            'Title': '$book_name',
            'Copies_sold': '$quantity',
            'Profit_gain': {
                '$multiply': [
                    '$price', '$quantity'
                ]
            },
            'Author_name': '$string.name'
        }
    }, {
        '$sort': {
            'Profit_gain': -1
        }
    }, {
        '$limit': 1
    }]);

    res.send({ message: "The most solded book is " + result[0].Title, details: result[0] });
}

//dsplay total profit
exports.displayProfit = async (req, res) => {

    const result = await book_info.aggregate([{
        '$lookup': {
            'from': 'auther_infos',
            'localField': 'author',
            'foreignField': '_id',
            'as': 'auther_entire_data'
        }
    }, {
        '$project': {
            '_id': 0,
            'Title': '$book_name',
            'Total_profit': {
                '$multiply': [
                    '$price', '$quantity'
                ]
            },
            'Auther Name': '$auther_entire_data.name',
        }
    }]);

    res.send({ message: "total profit earned by a book", result });
}

//display entire project profit
exports.totalProjectProfit = async (req, res) => {

    const result = await book_info.aggregate([
        {
            '$project': {
                '_id': 0,
                'profit': {
                    '$multiply': [
                        '$price', '$quantity'
                    ]
                }
            }
        }, {
            '$group': {
                '_id': '',
                'Entire_project_profit': {
                    '$sum': '$profit'
                }
            }
        }
    ]);

    res.send({ message: "entire project profit is " + result[0].Entire_project_profit + " RS" });
};

//display specefic auther book_info
exports.autherInfo = async (req, res) => {

    try {
        const user_id = req.params.id;

        const result = await auther_info.aggregate([{
            '$match': {
                '_id': mongoose.Types.ObjectId(user_id)
            }
        }, {
            '$lookup': {
                'from': 'book_infos',
                'localField': '_id',
                'foreignField': 'author',
                'as': 'string'
            }
        }, {
            '$unwind': {
                'path': '$string'
            }
        }, {
            '$project': {
                '_id': 0,
                'name': 1,
                'email': 1,
                'country': 1,
                'Book_title': '$string.book_name',
                'Profit_gain': {
                    '$multiply': [
                        '$string.price', '$string.quantity'
                    ]
                }
            }
        }]);

        const string_setter = result.length
            ? { message: "data of " + result[0].name + " auther", result }
            : { message: "No data found with given details!" };

        res.send(string_setter);
    } catch (err) {
        res.send({ "message": "error accured! to fetch data please try again after some time!", reason: err });
    }
};
