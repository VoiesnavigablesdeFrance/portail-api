// routes/fileUploadRoute.js
const express = require('express');
const router = express.Router();

const uploadController = require('../controllers/uploadController');

// Route pour télécharger un fichier
router.post('/', uploadController.uploadFile, uploadController.handleFileUpload);

module.exports = router;
