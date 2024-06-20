const express = require('express');
const router = express.Router();
// Importez d'autres modules si nécessaire, par exemple, votre module de base de données
const db = require('../database/connection');

// Exemple de route GET
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM tangram'; // Ajustez la table selon vos besoins
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données de tangram :', err);
            res.status(500).send('Erreur lors de la récupération des données de tangram');
        } else {
            res.send(results);
        }
    });
});

router.get('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const sql = 'SELECT * FROM tangram WHERE user_id = ?';
    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données de température :', err);
            res.status(500).send('Erreur lors de la récupération des données de température');
        } else {
            res.send(results);
        }
    });
});

// Exemple de route POST
router.post('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const tangram_pourcentage = req.body.tangram_pourcentage;
    const tangram_niveau = req.body.tangram_niveau;
    const tangram_nom = req.body.tangram_nom;
    console.log('test');

    if (!tangram_pourcentage || !tangram_niveau || !tangram_nom) {
        console.log(!tangram_pourcentage);
        console.log(!tangram_niveau);
        console.log(!tangram_nom);
        return res.status(400).json({ error: 'Les données sont manquantes dans le corps de la requête.' });
    }

    const sql = 'INSERT INTO tangram (user_id, tangram_pourcentage, tangram_niveau, tangram_nom) VALUES (?, ?, ?, ?)';
    db.query(sql, [user_id, tangram_pourcentage, tangram_niveau, tangram_nom], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion des données de tangram :', err);
            return res.status(500).json({ error: 'Erreur lors de l\'insertion des données de tangram.' });
        }
        res.status(201).json({ message: 'Données insérées avec succès.' });
    });
});

module.exports = router;
