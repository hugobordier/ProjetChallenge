// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');

// Middleware pour parser le corps des requêtes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Importer et utiliser les routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

const temperatureRoutes = require('./routes/temperature'); // Chemin relatif vers temperature.js
app.use('/', temperatureRoutes);

const tangramRoutes = require('./routes/tangram'); // Chemin relatif vers tangram.js
app.use('/tangram', tangramRoutes);

const dessinRoutes = require('./routes/dessin'); // Chemin relatif vers dessin.js
app.use('/dessin', dessinRoutes);

const postureRoutes = require('./routes/posture'); // Chemin relatif vers/posture.js
app.use('/posture', postureRoutes);

const fluxRoutes = require('./routes/flux'); // Chemin relatif vers/flux.js
app.use('/flux', fluxRoutes);

const pressionRoutes = require('./routes/pression'); // Chemin relatif vers/pression.js
app.use('/pression', pressionRoutes);

const strengthRoutes = require('./routes/strength'); // Chemin relatif vers/strength.js
app.use('/strength', strengthRoutes);

    const userRoutes = require('./routes/user'); // Chemin relatif vers/user.js
    app.use('/user', userRoutes);


// Démarrer le serveur
app.listen(port,'0.0.0.0', () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
