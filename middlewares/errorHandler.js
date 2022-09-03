const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.send(err);
}

module.exports = errorHandler;