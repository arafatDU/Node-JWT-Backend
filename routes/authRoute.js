const express = require('express');
const { loginController, dashboardController, registerController, getUsers } = require('../controllers/authController.js');

const router = express.Router();
const authMiddleware = require('../middleware/auth.js');


router.route('/register').post(registerController);
router.route('/login').post(loginController);
router.route('/users').get(getUsers);
router.route('/dashboard').get(authMiddleware, dashboardController);


module.exports = router;