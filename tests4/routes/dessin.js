const express = require('express');
const router = express.Router();
// Importez d'autres modules si nécessaire, par exemple, votre module de base de données
const db = require('../database/connection');

// Exemple de route GET
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM dessin'; 
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données de dessin :', err);
            res.status(500).send('Erreur lors de la récupération des données de tangram');
        } else {
            res.send(results);
        }
    });
});

router.get('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const sql = 'SELECT * FROM dessin WHERE user_id = ?';
    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données de dessin :', err);
            res.status(500).send('Erreur lors de la récupération des données de dessin');
        } else {
            res.send(results);
        }
    });
});

// Exemple de route POST
router.post('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const dessin_pourcentage = req.body.dessin_pourcentage;
    const dessin_niveau = req.body.dessin_niveau;
    const dessin_nom = req.body.dessin_nom;
    console.log(req.body);

    if (!dessin_pourcentage || !dessin_niveau || !dessin_nom) {
        return res.status(400).json({ error: 'Les données sont manquantes dans le corps de la requête.' });
    }

    const sql = 'INSERT INTO dessin (user_id, dessin_pourcentage, dessin_niveau, dessin_nom) VALUES (?, ?, ?, ?)';
    db.query(sql, [user_id, dessin_pourcentage, dessin_niveau, dessin_nom], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion des données de tangram :', err);
            return res.status(500).json({ error: 'Erreur lors de l\'insertion des données de tangram.' });
        }
        res.status(201).json({ message: 'Données insérées avec succès.' });
    });
});

module.exports = router;
