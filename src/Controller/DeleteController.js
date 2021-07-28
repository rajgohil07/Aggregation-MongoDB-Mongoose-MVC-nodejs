const book_info = require("../Model/book_info")();
const auther_info = require("../Model/auther_info")();

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