module.exports = {
  errorHandler: (err, req, res, next) => {
    if (err.name === 'JsonWebTokenError') {
      res.status(401).json({
        error: 'Please login for access this page.'
      })
    } else if (Array.isArray(err.errors)) {
      let errors = {};
      err.errors.forEach(error => {
        errors = error.message
      })
      res.status(400).json({
        error: errors
      })
    } else {
      res.status(err.code || 500).json({
        error: err.msg
      })
    }
  }
}