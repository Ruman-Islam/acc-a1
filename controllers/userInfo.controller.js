const fs = require('fs');
const path = require('path');


// GET A RANDOM USER
module.exports.getRandomUser = async (req, res, next) => {
    try {
        //// const dirname = `${__dirname}../../public/users.json`;
        const file = path.join(process.cwd(), './public/users.json');
        const data = await JSON.parse(fs.readFileSync(file));
        const randomUser = data[Math.floor(Math.random() * data.length)];
        res.status(200).json({ "data": randomUser });
    } catch (err) {
        next({
            "status": 500,
            "success": false,
            "message": err,
            "error": "Internal Server Error"
        });
    }
};

// GET ALL USER
module.exports.getAllUsers = async (req, res, next) => {
    try {
        //// const dirname = `${__dirname}../../public/users.json`;
        const { limit } = req.query;
        const file = path.join(process.cwd(), './public/users.json');
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

// ADD NEW USER
module.exports.addNewUser = async (req, res, next) => {
    try {
        //// const dirname = `${__dirname}../../public/users.json`;
        const file = path.join(process.cwd(), './public/users.json');
        const data = await JSON.parse(fs.readFileSync(file));
        const newUser = req.body;
        newUser.id = data.length + 1;
        data.push(newUser);
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

// UPDATE A USER
module.exports.updateUser = async (req, res, next) => {
    try {
        //// const dirname = `${__dirname}../../public/users.json`;
        const { id } = req.params;
        const updatedData = req.body;
        const dirname = path.join(process.cwd(), './public/users.json');
        const data = await JSON.parse(fs.readFileSync(dirname));

        // Dynamically update user's dynamic property
        const users = await data.map(user => user.id === Number(id) ? { ...user, ...updatedData } : user);
        fs.writeFileSync(dirname, JSON.stringify(users));

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

// BULK UPDATE
module.exports.bulkUpdate = async (req, res, next) => {
    try {
        //// const dirname = `${__dirname}../../public/users.json`;
        const updateUsers = req.body;
        const dirname = path.join(process.cwd(), './public/users.json');
        const data = await JSON.parse(fs.readFileSync(dirname));

        // Dynamically updating users dynamic property
        const updatedUsers = data.map((user) => {
            const updatedUser = updateUsers.find((u) => u.id === user.id);
            return updatedUser ? { ...user, ...updatedUser } : user;
        });

        fs.writeFileSync(dirname, JSON.stringify(updatedUsers));
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

// DELETE A USER
module.exports.deleteUser = async (req, res, next) => {
    try {
        //// const dirname = `${__dirname}../../public/users.json`;
        const { id } = req.params;
        const dirname = path.join(process.cwd(), './public/users.json');
        const data = await JSON.parse(fs.readFileSync(dirname));
        const filteredUsers = data.filter(user => user.id !== Number(id));
        fs.writeFileSync(dirname, JSON.stringify(filteredUsers));
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