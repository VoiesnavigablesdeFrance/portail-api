const express = require('express');
const router = express.Router();

const jsonToMdController = require('../controllers/jsonToMdController');

router.post('/', jsonToMdController.changeJsonToMd);

module.exports = router;
