const userModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const asyncWrapper = require('../middleware/async.js');
const { createCustomError, CustomAPIError } = require('../errors/custom-error.js');


const registerController = asyncWrapper( async (req, res, next) => {
  const newUser = {
    name: req.body.name,
    password: req.body.password
  }
  if(!newUser.name || !newUser.password){
    return next(createCustomError(`Please provide name and password`, 400));
  }
  const User = await userModel.create(newUser);
  res.status(201).json({ user: User });
})

const getUsers = asyncWrapper( async (req, res) => {
  const user = await userModel.find({});
  res.status(200).json({ users: user });
})


const loginController = asyncWrapper( async (req, res, next) => {
  const user = await userModel.findOne({
    name: req.body.name,
    password: req.body.password
  });
  if(!user){
    return next(createCustomError(`Wrong Information`, 404));
  }
  const token = jwt.sign({name: user.name, id: user._id}, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.status(200).json({ message: `Loged in successful`, token: token });
})

const dashboardController = asyncWrapper( async (req, res, next) => {
  console.log(req.user);
  const user = await userModel.findById(req.user.id);
  if(!user){
    return next(createCustomError(`User not found`, 404));
  }
  const luckyNum = Math.floor(Math.random() * 100);
  res.status(200).json({ msg: `Hello ${user.name}`, secret: `Here is your authorized data, your lucky number is ${luckyNum}`});
})

module.exports = {loginController, dashboardController, registerController, getUsers};