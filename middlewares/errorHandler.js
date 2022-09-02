const errorHandler = (err, req, res, next) => {
    console.log(err)
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status).send(err);
}

module.exports = errorHandler;