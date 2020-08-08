const errorHandler = (err, req, res, next) => {
    if (err.name == 'ValidationError') {
        return res.status(400).json({
            errors: err.errors
        })
    } else if (err.name == 'Unauthorized') {
        return res.status(401).json({
            errors: err.errors
        })
    } else if (err.name == 'NotFound') {
        return res.status(404).json({
            errors: err.errors
        })
    } else {
        return res.status(500).json(err)
    }
}

module.exports = errorHandler