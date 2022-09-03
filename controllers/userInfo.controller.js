const fs = require('fs');
const path = require('path');
const getRandomIndex = require('../utilities/randomIndexGen');



module.exports.getRandomUser = (req, res, next) => {
    try {
        const file = path.join(process.cwd(), 'users.json');
        const data = JSON.parse(fs.readFileSync(file, "utf-8"));
        const i = getRandomIndex(data.length);
        console.log(i);
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
    try {
        const { limit } = req.query;
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
        const file = path.join(process.cwd(), './users.json');
        const data = JSON.parse(fs.readFileSync(file, "utf-8"));
        data.push(req.body);
        fs.writeFileSync("./users.json", JSON.stringify(data), "utf-8");
        res.status(200).json({ "Success": true });
    } catch (err) {
        next({
            status: 500,
            success: false,
            message: "Internal Server Error"
        });
    }
};