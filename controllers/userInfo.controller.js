const fs = require('fs');
const getRandomIndex = require('../utilities/randomIndexGen');

module.exports.getAllUsers = (req, res, next) => {
    try {
        const users = fs.readFileSync("userData.json");
        const data = JSON.parse(users);
        res.status(200).json({ "data": data });
    } catch (err) {
        next('Failed to Read Data !!');
    }
};


module.exports.getRandomUser = (req, res, next) => {
    try {
        const users = fs.readFileSync("userData.json");
        const data = JSON.parse(users);
        const i = getRandomIndex(data.length);
        res.status(200).json({ "data": data[i] });
    } catch (err) {
        next('Failed to Read Data !!');
    }
};