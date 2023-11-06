const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const fileUploadRoute = require('./routes/uploadRoute'); // Importez votre route de téléchargement de fichiers
const filejsonToMdRoute = require('./routes/jsonToMdRoute');

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use("/api/upload", fileUploadRoute)
app.use("/api/crudApi", filejsonToMdRoute)
// Autres configurations et routes de votre application...

// Démarrage du serveur
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

module.exports = server
