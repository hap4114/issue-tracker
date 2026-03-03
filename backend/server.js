const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const issueRoutes = require('./routes/issueRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/issues', issueRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        const port = parseInt(process.env.PORT, 10) || 5000;
        app.listen(port, '0.0.0.0', () =>
            console.log(`Server running on port ${port}`)
        );
    })
    .catch((err) => {
        console.error('DB connection failed:', err.message);
        console.error('Check your MONGO_URI in .env');
        process.exit(1);
    });

