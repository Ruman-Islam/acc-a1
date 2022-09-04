const validator = (req, res, next) => {
    const { gender, name, contact, address, photoUrl } = req.body;

    if (!gender) {
        res.status(404).json({
            "message": `Gender not found`
        })
    } else if (!name) {
        res.status(404).json({
            "message": `Name not found`
        })
    } else if (!contact) {
        res.status(404).json({
            "message": `Contact not found`
        })
    } else if (!address) {
        res.status(404).json({
            "message": `Address not found`
        })
    } else if (!photoUrl) {
        res.status(404).json({
            "message": `Photo url not found`
        })
    } else {
        next();
    }
}

module.exports = validator;