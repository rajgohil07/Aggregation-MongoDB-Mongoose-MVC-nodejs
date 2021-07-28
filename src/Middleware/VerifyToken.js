const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = (req, res, cb) => {

    const token = req.headers['authorization'];

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        data.valid ? cb() : '';
    } catch (err) {
        res.send({
            message: "Failed to authenticate!",
            reason: err.message
        });
    }
};