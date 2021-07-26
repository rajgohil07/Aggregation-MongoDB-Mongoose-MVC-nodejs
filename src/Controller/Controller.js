const mongoose = require("mongoose");
const book_info = require("../Model/book_info")(mongoose);
const auther_info = require("../Model/auther_info")(mongoose);

//if wrong url
exports.NotFound = (req, res) => res.send({ message: 'invalid URL!' });

//to insert the auther
exports.insertAuther = async (req, res) => {

    //body data
    const data = {
        name: req.body.name,
        email: req.body.email,
        country: req.body.country,
        age: req.body.age
    }

    const result = await auther_info.create(data);
    res.send({ message: "Author data inserted successfully", result });
}

//to insert book
exports.insertBook = async (req, res) => {

    //body data
    const data = {
        book_name: req.body.book_name,
        price: req.body.price,
        quantity: req.body.quantity
    }

    const result = await book_info.create(data);
    res.send({ message: "Book data inserted successfully", result });
}

//to insert Auther To Book
exports.insertAutherToBook = async (req, res) => {

    const book_id = req.params.id;

    const auther_arr = req.body.data;

    const result = await book_info.findByIdAndUpdate(book_id, {
        $push: { author: { $each: auther_arr } }
    }, { new: true });

    res.send({ message: "new auther has been added to the book " + result.book_name, updated_data: result });
};

//display book with auther
exports.getAuthersWithBook = async (req, res) => {

    const result = await book_info.aggregate([
        {
            '$lookup': {
                'from': 'auther_infos',
                'localField': 'author',
                'foreignField': '_id',
                'as': 'auther_entire_info'
            }
        }, {
            '$project': {
                '_id': 0,
                'book_title': '$book_name',
                'book_price': '$price',
                'book_quantity': '$quantity',
                'auther_entire_info.name': 1,
                'auther_entire_info.email': 1,
                'auther_entire_info.country': 1,
                'auther_entire_info.age': 1
            }
        }
    ]);

    res.send({ "message": " all data associated with notes", result });
};

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

//remove auther from book
exports.removeAtherToBook = async (req, res) => {

    const book_id = req.params.id;
    const auther_arr = req.body.data;

    const result = await book_info.findByIdAndUpdate(book_id, {
        $pull: { author: { $in: auther_arr } }
    }, { new: true });

    res.send({ message: "Auther has been removed to the book " + result.book_name, updated_data: result });
};

//to delete auther by id
exports.deleteAuther = async (req, res) => {

    const auther_id = req.params.id;
    const data = await auther_info.findByIdAndDelete(auther_id);

    data
        ? res.send({ message: "auther data of " + data.name + " sucessfully deleted", deleted_data: data })
        : res.send({ message: "NO data found to delete!" });
};

//to delete book by id
exports.deleteBook = async (req, res) => {

    const book_id = req.params.id;
    const data = await book_info.findByIdAndDelete(book_id);

    data
        ? res.send({ message: "book data of " + data.book_name + " sucessfully deleted", deleted_data: data })
        : res.send({ message: "NO data found to delete!" });
};

//to delete All Data
exports.deleteAllData = async (req, res) => {

    const delete_auther = await auther_info.deleteMany();
    const delete_book = await book_info.deleteMany();

    const sucess_string = (delete_auther.deletedCount || delete_book.deletedCount)
        ? `${delete_auther.deletedCount + delete_book.deletedCount} Documemt(s) has been deleted!`
        : `No documemts found to delete!`

    res.send({ message: sucess_string });
};