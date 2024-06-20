const express = require('express');
const router = express.Router();
// Importez d'autres modules si nécessaire, par exemple, votre module de base de données
const db = require('../database/connection');

// Exemple de route GET
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM posture'; // Ajustez la table selon vos besoins
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données de posture :', err);
            res.status(500).send('Erreur lors de la récupération des données de posture');
        } else {
            res.send(results);
        }
    });
});

router.get('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const sql = 'SELECT * FROM posture WHERE user_id = ?';
    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données de posture :', err);
            res.status(500).send('Erreur lors de la récupération des données de posture');
        } else {
            res.send(results);
        }
    });
});

// Exemple de route POST
router.post('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const posture_pourcentage = req.body.posture_pourcentage;
    const posture_niveau = req.body.posture_niveau;
    const posture_name = req.body.posture_name;
    console.log(req.body);

    if (!posture_pourcentage || !posture_niveau || !posture_name) {
        return res.status(400).json({ error: 'Les données sont manquantes dans le corps de la requête.' });
    }

    const sql = 'INSERT INTO posture (user_id, posture_pourcentage, posture_niveau, posture_name) VALUES (?, ?, ?, ?)';
    db.query(sql, [user_id, posture_pourcentage, posture_niveau, posture_name], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion des données de posture :', err);
            return res.status(500).json({ error: 'Erreur lors de l\'insertion des données de posture.' });
        }
        res.status(201).json({ message: 'Données insérées avec succès.' });
    });
});

module.exports = router;
