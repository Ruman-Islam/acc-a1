const fs = require('fs');
const path = require('path');
const getRandomIndex = require('../utilities/randomIndexGen');



module.exports.getRandomUser = async (req, res, next) => {
    try {
        const file = path.join(process.cwd(), './public/users.json');
        const data = await JSON.parse(fs.readFileSync(file, "utf-8"));
        const index = getRandomIndex(data.length);
        res.status(200).json({ "data": data[index] });
    } catch (err) {
        next({
            "status": 500,
            "success": false,
            "message": err,
            "error": "Internal Server Error"
        });
    }
};

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const { limit } = req.query;
        const file = path.join(process.cwd(), './public/users.json');
        const data = await JSON.parse(fs.readFileSync(file, "utf-8"));
        const users = await limit > 0 ? data.slice(0, limit) : data;
        await res.status(200).json({ "data": users });
    } catch (err) {
        next({
            "status": 500,
            "success": false,
            "message": err,
            "error": "Internal Server Error"
        });
    }
};

module.exports.addNewUser = async (req, res, next) => {
    try {
        const file = path.join(process.cwd(), './public/users.json');
        const data = await JSON.parse(fs.readFileSync(file, "utf-8"));
        data.push(req.body);
        fs.writeFileSync(file, JSON.stringify(data), "utf-8");
        res.status(200).json({ "Success": true });
    } catch (err) {
        next({
            "status": 500,
            "success": false,
            "message": err,
            "error": "Internal Server Error"
        });
    }
};

module.exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const file = path.join(process.cwd(), './public/users.json');
        const data = await JSON.parse(fs.readFileSync(file, "utf-8"));
        const newArray = await data.map(user => {
            if ((user.id).toString() === id) {
                return { ...updatedData };
            } else {
                return user;
            }
        })
        fs.writeFileSync("./users.json", JSON.stringify(newArray), "utf-8");
        res.status(200).json({ "Success": true });
    } catch (err) {
        next({
            "status": 500,
            "success": false,
            "message": err,
            "error": "Internal Server Error"
        });
    }
};