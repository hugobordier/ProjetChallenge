const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../database/connection');

express.json();

// Route pour la page d'accueil
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../form.html'));
});

// Route pour l'insertion des données
router.post('/send', (req, res) => {
    const rec_temperature = req.body.rec_temperature;
    const rec_humidite = req.body.rec_humidite;

    const sql = "INSERT INTO `table1` (`data_id`, `data_temperature`, `data_humidite`, `data_date`) VALUES (NULL, ?, ?, CURRENT_TIMESTAMP())";
    db.query(sql, [rec_temperature, rec_humidite], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion des données :', err);
            res.send('Erreur lors de l\'insertion des données');
        } else {
            res.send('Database : New record created successfully');
        }
    });
});

// Route pour la page d'affichage des données
router.get('/table', (req, res) => {
    res.sendFile(path.join(__dirname, '../loader.html'));
});

// API pour récupérer les données de la table
router.get('/api/table', (req, res) => {
    const sql = 'SELECT * FROM `table1`';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données :', err);
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            res.json(results);
        }
    });
});

// Route pour l'affichage des données
/*router.get('/table', (req, res) => {
    const sql = 'SELECT * FROM `table1`';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données :', err);
            res.send('Erreur lors de la récupération des données');
        } else {
            res.send(results);
        }
    });
});*/

module.exports = router;
