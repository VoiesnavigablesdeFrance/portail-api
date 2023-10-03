const express = require('express');
const router = express.Router();

const jsonToMdController = require('../controllers/jsonToMdController');

router.post('/addApi', jsonToMdController.changeJsonToMd);
router.delete('/deleteApi',jsonToMdController.deleteApi)

module.exports = router;
