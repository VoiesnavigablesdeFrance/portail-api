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

//SQL
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('login.db');

// Lire le fichier SQL
const sql = fs.readFileSync('queries.sql', 'utf8');

// Exécuter les requêtes SQL
db.serialize(() => {
  db.exec(sql, (err) => {
    if (err) {
      throw err;
    }

    // Sélectionner toutes les données
    db.all("SELECT * FROM utilisateurs", (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row.id, row.nom, row.age);
      });
    });

    // Fermer la base de données après avoir terminé
    db.close();
  });
});







// Démarrage du serveur
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

module.exports = server
