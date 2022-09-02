const fs = require('fs');
const path = require('path');
const getRandomIndex = require('../utilities/randomIndexGen');

module.exports.getAllUsers = (req, res, next) => {
    try {
        const file = path.join(process.cwd(), './users.json');
        const users = fs.readFileSync(file, "utf-8");
        const data = JSON.parse(users);
        res.status(200).send(data);
    } catch (err) {
        next('Failed to Read Data !!');
    }
};


module.exports.getRandomUser = (req, res, next) => {
    try {
        const users = fs.readFileSync("./users.json");
        const data = JSON.parse(users);
        const i = getRandomIndex(data.length);
        res.status(200).json({ "data": data[i] });
    } catch (err) {
        next('Failed to Read Data !!');
    }
};