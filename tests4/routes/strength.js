const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM strength'; 
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données de strength :', err);
            res.status(500).send('Erreur lors de la récupération des données de strength');
        } else {
            res.send(results);
        }
    });
});

router.get('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const sql = 'SELECT * FROM strength WHERE user_id = ?';
    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données de strength :', err);
            res.status(500).send('Erreur lors de la récupération des données de strength');
        } else {
            res.send(results);
        }
    });
});

router.post('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const strength_score = req.body.strength_score;
    console.log(req.body);

    if (!strength_score ) {
        return res.status(400).json({ error: 'Les données sont manquantes dans le corps de la requête.' });
    }

    const sql = 'INSERT INTO strength (user_id, strength_score) VALUES (?, ?)';
    db.query(sql, [user_id, strength_score], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion des données de strength :', err);
            return res.status(500).json({ error: 'Erreur lors de l\'insertion des données de strength.' });
        }
        res.status(201).json({ message: 'Données insérées avec succès.' });
    });
});

module.exports = router;
