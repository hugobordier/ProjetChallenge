const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM user'; 
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données de user :', err);
            res.status(500).send('Erreur lors de la récupération des données de user');
        } else {
            res.send(results);
        }
    });
});

router.get('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const sql = 'SELECT * FROM user WHERE user_id = ?';
    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données de user :', err);
            res.status(500).send('Erreur lors de la récupération des données de user');
        } else {
            res.send(results);
        }
    });
});

router.post('/', (req, res) => {
    const user_name = req.body.user_name;
    const user_password = req.body.user_password;
    const user_email = req.body.user_email;
    const user_prenom = req.body.user_prenom;
    console.log(req.body);

    if (!user_name ) {
        return res.status(400).json({ error: 'Les données sont manquantes dans le corps de la requête.' });
    }

    const sql = 'INSERT INTO user (user_name, user_password,user_email,user_prenom) VALUES (?, ?, ?, ?)';
    db.query(sql, [user_name, user_password,user_email,user_prenom], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion des données de user :', err);
            return res.status(500).json({ error: 'Erreur lors de l\'insertion des données de user.' });
        }
        res.status(201).json({ message: 'Données insérées avec succès.' });
    });
});

module.exports = router;
