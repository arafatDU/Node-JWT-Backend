const { CustomAPIError } = require("../errors/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log("From error-handler.js: ", err);
  if(err instanceof CustomAPIError){
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.log("From error-handler.js: ", err);
  return res.status(500).json({ message: err });
}


module.exports = errorHandlerMiddleware;