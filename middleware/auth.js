const jwt = require('jsonwebtoken')
const { CustomAPIError } = require('../errors/custom-error.js')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 401)
  }

  const token = authHeader.split(' ')[1];
  console.log(token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    const { id, name } = decoded
    req.user = { id, name }
    next()
  } catch (error) {
    throw new CustomAPIError('Not authorized to access this route', 401)
  }
}

module.exports = authenticationMiddleware