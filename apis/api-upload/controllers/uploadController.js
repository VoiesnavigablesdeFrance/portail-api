const fs = require('fs');
// controllers/uploadController.js
const multer = require('multer');
const uploadExcelController = require('../controllers/uploadExcelController');
let nameFile = "";
// Configuration de Multer pour gérer les fichiers téléchargés
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Dossier où seront stockés les fichiers
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    nameFile = file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop();
  },
});
const upload = multer({ storage });

// Middleware pour gérer le téléchargement de fichiers
exports.uploadFile = upload.single('fileApi');

// Fonction de traitement du téléchargement de fichier
exports.handleFileUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier n\'a été téléchargé' });
  }
  // Vous pouvez traiter le fichier ici (par exemple, le stocker ou le renvoyer en réponse).
  res.status(200).json({ message: 'Fichier téléchargé avec succès' });
  const cheminFichierExcel = "./uploads/" + nameFile;
  uploadExcelController.createdMdFile(cheminFichierExcel);
};