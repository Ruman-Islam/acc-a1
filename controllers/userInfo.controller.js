const fs = require('fs');
const path = require('path');
const getRandomIndex = require('../utilities/randomIndexGen');




module.exports.getRandomUser = async (req, res, next) => {
    try {
        const file = path.join(process.cwd(), './public/users.json');
        // const dirname = `${__dirname}../../public/users.json`;
        const data = await JSON.parse(fs.readFileSync(file));
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
        // const dirname = `${__dirname}../../public/users.json`;
        const data = await JSON.parse(fs.readFileSync(file));
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
        // const dirname = `${__dirname}../../public/users.json`;
        const data = await JSON.parse(fs.readFileSync(file));
        data.push(req.body);
        fs.writeFileSync(file, JSON.stringify(data));
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
        // const dirname = `${__dirname}../../public/users.json`;
        const data = await JSON.parse(fs.readFileSync(file));
        const objIndex = data.findIndex(o => o.id === Number(id));
        const existingUser = data[objIndex];  //@ Finding desired user

        // Dynamically update user property
        if (updatedData.id) { existingUser.id = updatedData.id };
        if (updatedData.name) { existingUser.name = updatedData.name };
        if (updatedData.gender) { existingUser.gender = updatedData.gender };
        if (updatedData.contact) { existingUser.contact = updatedData.contact; };
        if (updatedData.address) { existingUser.address = updatedData.address; };
        if (updatedData.photoUrl) { existingUser.photoUrl = updatedData.photoUrl };

        // Update the array with updated user
        const users = await data.map(user => (user.id).toString() === id ? { ...existingUser } : user);
        fs.writeFileSync(file, JSON.stringify(users));

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

module.exports.bulkUpdate = async (req, res, next) => {
    const ids = req.body;
    console.log(ids);
    try {

    } catch (err) {
        next({
            "status": 500,
            "success": false,
            "message": err,
            "error": "Internal Server Error"
        });
    }
};

// [
//     {"id": 1, "contact": "01536160661"},
//       {"id": 2, "contact": "01653598874"},
//         {"id": 3, "contact": "01613712217"}
//  ]