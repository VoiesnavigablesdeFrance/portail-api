const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const fileLoginRoute = require('./routes/loginRoute');

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use("/api/login", fileLoginRoute);

//SQL
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('login.db');

// Lire le fichier SQL
//const path = require('path')
//const sql = fs.readFileSync(path.join(__dirname,'./queries.sql'), 'utf8');

// Exécuter les requêtes SQL
/*db.serialize(() => {
  db.exec(sql, (err) => {
    if (err) {
      throw err;
    }

    // Sélectionner toutes les données
    db.all("SELECT * FROM users", (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row.id, row.user, row.role);
      });
    });

    // Fermer la base de données après avoir terminé
    db.close();
  });
});*/

db.serialize(()=>{
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      //console.log(row.id, row.user, row.role);
    });
  });
})

// Démarrage du serveur
const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

module.exports = server
