const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM pression'; 
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données de pression :', err);
            res.status(500).send('Erreur lors de la récupération des données de pression');
        } else {
            res.send(results);
        }
    });
});

router.get('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const sql = 'SELECT * FROM pression WHERE user_id = ?';
    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données de pression :', err);
            res.status(500).send('Erreur lors de la récupération des données de pression');
        } else {
            res.send(results);
        }
    });
});

router.post('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const pression_valeur = req.body.pression_valeur;
    console.log(req.body);

    if (!pression_valeur ) {
        return res.status(400).json({ error: 'Les données sont manquantes dans le corps de la requête.' });
    }

    const sql = 'INSERT INTO pression (user_id, pression_valeur) VALUES (?, ?)';
    db.query(sql, [user_id, pression_valeur], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion des données de pression :', err);
            return res.status(500).json({ error: 'Erreur lors de l\'insertion des données de pression.' });
        }
        res.status(201).json({ message: 'Données insérées avec succès.' });
    });
});

module.exports = router;
