const fs = require('fs');
const path = require('path');
const getRandomIndex = require('../utilities/randomIndexGen');



module.exports.getRandomUser = (req, res, next) => {
    try {
        const file = path.join(process.cwd(), './users.json');
        const users = fs.readFileSync(file, "utf-8");
        const data = JSON.parse(users);
        const i = getRandomIndex(data.length);
        res.status(200).json({ "data": data[i] });
    } catch (err) {
        next({
            status: 500,
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports.getAllUsers = (req, res, next) => {
    const { limit } = req.query;
    try {
        const file = path.join(process.cwd(), './users.json');
        const data = JSON.parse(fs.readFileSync(file, "utf-8"));
        const users = limit > 0 ? data.slice(0, limit) : data;
        res.status(200).json({ "data": users });
    } catch (err) {
        next({
            status: 500,
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports.addNewUser = (req, res, next) => {
    try {
        res.status(200).json({ "data": "hello" })
    } catch (err) {
        next({
            status: 500,
            success: false,
            message: "Internal Server Error"
        });
    }
};