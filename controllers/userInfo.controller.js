const fs = require('fs');
const path = require('path');
const getRandomIndex = require('../utilities/randomIndexGen');



module.exports.getRandomUser = (req, res, next) => {
    try {
        const data = JSON.parse(fs.readFileSync('./users.json', "utf-8"));
        const index = getRandomIndex(data.length);
        res.status(200).json({ "data": data[index] });
    } catch (err) {
        next({
            "status": 500,
            "success": false,
            "message": "Cannot read the file",
            "error": "Internal Server Error"
        });
    }
};

module.exports.getAllUsers = (req, res, next) => {
    try {
        const { limit } = req.query;
        const data = JSON.parse(fs.readFileSync('./users.json', "utf-8"));
        const users = limit > 0 ? data.slice(0, limit) : data;
        res.status(200).json({ "data": users });
    } catch (err) {
        next({
            "status": 500,
            "success": false,
            "message": "Cannot read the file",
            "error": "Internal Server Error"
        });
    }
};

module.exports.addNewUser = (req, res, next) => {
    try {
        const data = JSON.parse(fs.readFileSync('./users.json', "utf-8"));
        data.push(req.body);
        fs.writeFileSync("./users.json", JSON.stringify(data), "utf-8");
        res.status(200).json({ "Success": true });
    } catch (err) {
        next({
            "status": 500,
            "success": false,
            "message": "Cannot read the file",
            "error": "Internal Server Error"
        });
    }
};

module.exports.updateUser = (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const data = JSON.parse(fs.readFileSync('./users.json', "utf-8"));
        const newArray = data.map(user => {
            if ((user.id).toString() === id) {
                return { ...updatedData };
            } else {
                return user;
            }
        })
        fs.writeFileSync("./users.json", JSON.stringify(data), "utf-8");
        res.status(200).json({ "Success": true });
    } catch (err) {
        next({
            "status": 500,
            "success": false,
            "message": "Cannot read the file",
            "error": "Internal Server Error"
        });
    }
};