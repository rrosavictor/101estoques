const express = require('express');
const cors = require('cors');
const eventoRoutes = require('./routes/eventoRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'Function Eventos OK',
    timestamp: new Date()
  });
});

// Rotas das functions
app.use('/api', eventoRoutes);

module.exports = app;