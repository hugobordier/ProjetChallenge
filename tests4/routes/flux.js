const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM flux'; 
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données de flux :', err);
            res.status(500).send('Erreur lors de la récupération des données de flux');
        } else {
            res.send(results);
        }
    });
});

router.get('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const sql = 'SELECT * FROM flux WHERE user_id = ?';
    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données de flux :', err);
            res.status(500).send('Erreur lors de la récupération des données de flux');
        } else {
            res.send(results);
        }
    });
});

router.post('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const flux_score = req.body.flux_score;
    const flux_reussi = req.body.flux_reussi;
    console.log(req.body);

    if (!flux_score || !flux_reussi) {
        return res.status(400).json({ error: 'Les données sont manquantes dans le corps de la requête.' });
    }

    const sql = 'INSERT INTO posture (user_id, flux_score, flux_reussi) VALUES (?, ?, ?)';
    db.query(sql, [user_id, flux_score, flux_reussi], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion des données de posture :', err);
            return res.status(500).json({ error: 'Erreur lors de l\'insertion des données de posture.' });
        }
        res.status(201).json({ message: 'Données insérées avec succès.' });
    });
});

router.post('/', (req, res) => {
    const user_id = req.body.user_id;
    const flux_score = req.body.flux_score;
    const flux_reussi = req.body.flux_reussi;
    console.log(req.body);

    if (!flux_score || !flux_reussi) {
        return res.status(400).json({ error: 'Les données sont manquantes dans le corps de la requête.' });
    }

    const sql = 'INSERT INTO posture (user_id, flux_score, flux_reussi) VALUES (?, ?, ?)';
    db.query(sql, [user_id, flux_score, flux_reussi], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion des données de posture :', err);
            return res.status(500).json({ error: 'Erreur lors de l\'insertion des données de posture.' });
        }
        res.status(201).json({ message: 'Données insérées avec succès.' });
    });
});

module.exports = router;
