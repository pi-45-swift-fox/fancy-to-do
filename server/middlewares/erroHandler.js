function errorHandler(err, req, res, next) {
console.log(err)
  if (err.name === "SequelizeValidationError") {
    const errorMessages = [];
    err.errors.forEach((e) => {
      errorMessages.push(e.message);
    });
    res
      .status(400)
      .json({ message: "validation error", errors: errorMessages });
  } else if (err.name == "validation_error") {
    res.status(err.statusCode).json({ message: err.message });
  } else if(err.message && err.statusCode){
    res.status(err.statusCode).json({message:err.message})
  }
  
  else {
    console.log(err)
    res.status(500).json({ message:err });
  }
}
module.exports = errorHandler