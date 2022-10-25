const express = require('express');
const router = express.Router();

const {loginUser} = require('../controllers/LoginController');

router.route('/login').post(loginUser);

module.exports = router;