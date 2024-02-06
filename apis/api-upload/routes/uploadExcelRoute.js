const express = require('express');
const router = express.Router();

const uploadExcelController = require('../controllers/uploadExcelController');

router.get('/addApi', uploadExcelController.createdMdFile);

module.exports = router;
