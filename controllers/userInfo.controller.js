const fs = require('fs');
const getRandomIndex = require('../utilities/randomIndexGen');

module.exports.getAllUsers = (req, res, next) => {
    try {
        const users = fs.readFileSync("./users.json", "utf-8");
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

// app.get("/user/all", (req, res) => {
//     const users = fs.readFileSync("./users.json", "utf-8");
//     const user = JSON.parse(users);
//     const limit = req.query.limit;
//     if (limit) {
//         res.send(user.slice(0, limit));
//     } else {
//         res.send(user);
//     }
// }),