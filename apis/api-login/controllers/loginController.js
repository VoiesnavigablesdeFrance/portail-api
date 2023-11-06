const { error } = require("@axe-core/cli/dist/src/lib/utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
    let userAdmin = {
        user: null,
        password: null
    };

    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./login.db');
    
    const userLog = req.body;

    db.serialize(() => {
        db.all("SELECT user, pwd FROM users where user = ?", userLog.user, (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }
            // Vérifiez si le résultat est vide avant de parcourir les lignes
            if (rows.length === 0) {
                return res.status(400).json({ message: 'User not found' });
            }
            userAdmin.user = rows[0].user;
            userAdmin.password = rows[0].pwd;
            bcrypt.compare(userLog.password, userAdmin.password, function(err, result) {
                if (result && userAdmin.user === userLog.user) {
                    const jsonData = { role: "admin" };
                    const secretKey = "test"; 
                    const options = {};
                    jwt.sign(jsonData, secretKey, options, (err, token) => {
                        if (err) {
                            console.error('Token creation error:', err);
                            return res.status(500).json({ message: 'Token creation failed' });
                        }
                        if (token) {
                            return res.status(200).json({ message: 'Valid connection', token: token });
                        } else {
                            return res.status(500).json({ message: 'Token creation failed' });
                        }
                    });
                    
                } else {
                    return res.status(400).json({ message: 'Invalid connection' });
                }
            });
        });
    });
};

exports.test = (req, res) => {
   return res.status(200).json({message: 'bien joué'})
};