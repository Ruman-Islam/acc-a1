const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.json({ "error": err });
}

module.exports = errorHandler;