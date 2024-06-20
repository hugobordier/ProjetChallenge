const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));// pour acceder au truc de public sans passer par /public
//app.use(express.static(path.join(__dirname, '../')))

app.listen(port,'0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});