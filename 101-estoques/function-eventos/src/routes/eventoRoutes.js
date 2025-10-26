const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventoController');

// Function: Criar Evento (HTTP Trigger)
router.post('/eventos', controller.criarEvento);

// Function: Consultar Eventos (HTTP Trigger)
router.get('/eventos', controller.consultarEventos);

module.exports = router;