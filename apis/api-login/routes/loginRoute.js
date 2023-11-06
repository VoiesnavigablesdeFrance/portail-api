const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

router.post('/',loginController.login);
router.get('/o',loginController.test)

module.exports = router