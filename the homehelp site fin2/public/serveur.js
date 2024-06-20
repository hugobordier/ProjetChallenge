const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const dbURI = 'mongodb://localhost:27017/teachable'; // Remplacez par votre URI MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const resultSchema = new mongoose.Schema({
    label: String,
    probability: Number,
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);

app.post('/api/save-result', async (req, res) => {
    const { label, probability } = req.body;
    const newResult = new Result({ label, probability });
    try {
        await newResult.save();
        res.json({ message: 'Result saved successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
