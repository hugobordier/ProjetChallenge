const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const path = require('path');

express.json();

// route pour les temperature d'un user
router.get('/temperature/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const sql = 'SELECT * FROM TEMPERATURE WHERE user_id = ?';
    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données de température :', err);
            res.status(500).send('Erreur lors de la récupération des données de température');
        } else {
            res.send(results);
        }
    });
});

//route pour toutes les temperatures
router.get('/temperature', (req, res) => {
    const sql = 'SELECT * FROM TEMPERATURE';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données de température :', err);
            res.status(500).send('Erreur lors de la récupération des données de température');
        } else {
            res.send(results);
        }
    });
});

router.post('/temperature/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const temperature_valeur = req.body.temperature_valeur; 
    console.log(req.body);
    if (!temperature_valeur) {
        return res.status(400).json(req.body);
    }

    const sql = 'INSERT INTO temperature (user_id, temperature_valeur) VALUES (?, ?)';
    db.query(sql, [user_id, temperature_valeur], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion de la température :', err);
            return res.status(500).json({ error: 'Erreur lors de l\'insertion de la température.' });
        }
        res.status(201).json({ message: 'Température insérée avec succès.' });
    });
});

router.post('/temperature', (req, res) => {
    const user_id = req.body.user_id;
    const temperature_valeur = req.body.temperature_valeur; 
    console.log(req.body);
    if (!temperature_valeur) {
        return res.status(400).json(req.body);
    }

    const sql = 'INSERT INTO temperature (user_id, temperature_valeur) VALUES (?, ?)';
    db.query(sql, [user_id, temperature_valeur], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion de la température :', err);
            return res.status(500).json({ error: 'Erreur lors de l\'insertion de la température.' });
        }
        res.status(201).json({ message: 'Température insérée avec succès.' });
    });
});

module.exports = router;
