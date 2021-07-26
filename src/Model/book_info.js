module.exports = (mongoose) => {

    const bookSchema = new mongoose.Schema({

        book_name: {
            type: String,
            require: true
        },
        author: [mongoose.ObjectId],
        price: {
            type: Number,
            require: true
        },
        quantity: {
            type: Number,
            require: true
        }
    }, {
        versionKey: false
    });

    return mongoose.model('book_info', bookSchema);

};