const fs = require('fs');
const path = require('path');


module.exports.addNewUser = (req, res, next) => {
    const { gender, name, contact, address, photoUrl } = req.body;

    if (!gender) {
        res.status(404).json({
            "message": `Gender not found`
        });
    } else if (!name) {
        res.status(404).json({
            "message": `Name not found`
        });
    } else if (!contact) {
        res.status(404).json({
            "message": `Contact not found`
        });
    } else if (!address) {
        res.status(404).json({
            "message": `Address not found`
        });
    } else if (!photoUrl) {
        res.status(404).json({
            "message": `Photo url not found`
        });
    } else {
        next();
    }
};

module.exports.updateUser = (req, res, next) => {
    const id = Number(req.params.id);
    req.params.id = id
    const dirname = path.join(process.cwd(), './public/users.json');
    const data = JSON.parse(fs.readFileSync(dirname));
    const existedUser = data.find(user => user.id === id);

    if (!id) {
        res.status(404).json({
            "message": `User not found`
        });
    } else if (!existedUser) {
        res.status(404).json({
            "message": `User not found`
        });
    }
    else {
        next();
    }
};

module.exports.bulkUpdate = (req, res, next) => {
    const updatedUsers = req.body;
    const dirname = path.join(process.cwd(), './public/users.json');
    const data = JSON.parse(fs.readFileSync(dirname));
    for (const user of updatedUsers) {
        const id = Number(user.id);

        if (!id || id === 0 || !(data.find((u) => u.id === user.id))) {
            res.status(404).json({
                "message": `User id ${id} is not found`
            });
            break;
        } else {
            next();
        }
    }
};